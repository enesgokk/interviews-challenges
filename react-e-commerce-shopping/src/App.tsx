import {useState} from "react";
import {useQuery} from "react-query";
import Item from "./Item/Item";
import Cart from "./Cart/Cart";
import Sidebar from "./Sidebar/Sidebar";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress"
import Grid from "@material-ui/core/Grid";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import Badge from "@material-ui/core/Badge";
import {Wrapper,StyledButton} from "./App.styles";
import {Row,Col} from "reactstrap";

export type CartItemType={
  id:number;
  category:string;
  description:string;
  image:string;
  price:number;
  title:string;
  amount:number;
}

const getProducts=async(): Promise<CartItemType[]> =>
  await (await fetch('https://fakestoreapi.com/products')).json();

const App = () => {
  const [cartOpen, setCartOpen]=useState(false);
  const [cartItems,setCartItems]= useState([] as CartItemType[]);
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    'products',
    getProducts
  );
  console.log(data);

  const getTotalItems=(items: CartItemType[])=>
    items.reduce((ack:number, item) => ack + item.amount, 0);

  const handleAddToCart=(clickedItem: CartItemType)=>{
    setCartItems(prev => {
      const isItemInCart=prev.find(item => item.id === clickedItem.id);
      
      if(isItemInCart){
        return prev.map(item =>
          item.id===clickedItem.id 
           ? { ...item, amount: item.amount+1}
           : item
          );
      }
      return [...prev, {...clickedItem, amount:1 }];
    });
  };
  
  const handleRemoveFromCart=(id:number)=>{
    setCartItems(prev => 
      prev.reduce((ack,item)=>{
        if(item.id==id){
          if(item.amount===1) return ack;
          return [...ack, { ...item,amount:item.amount-1}];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
      
    )
  }

  if(isLoading) return <LinearProgress/>;
  if(error) return <div>Something went wrong ...</div>;
  return (
    <Wrapper>
      <div className="navbar">
      <a>Some</a>
      <a>Dummy</a>
      <a>Links</a>
        <StyledButton onMouseOver={()=>setCartOpen(true)} onClick={()=>setCartOpen(true)}>
          <Badge badgeContent={getTotalItems(cartItems)} color='error'>
            <AddShoppingCartIcon/>
          </Badge>
        </StyledButton>
      </div>
      <Drawer anchor='right' open={cartOpen} onClose={()=>setCartOpen(false)}>
        <Cart 
        cartItems={cartItems}
        addToCart={handleAddToCart}
        removeFromCart={handleRemoveFromCart}
        />
      </Drawer>

        <Row>
          <Col xs="2" className="sidebarItem" > 
            {data?.map(item => (
              <div key={item.id}>
                <Sidebar item={item} handleAddToCart={handleAddToCart}/>
              </div>
            ))}
          </Col>

          <Col lg="10" xs="12">
             <Grid container spacing={3}>
             {data?.map(item => (
              <Grid item key={item.id} xs={12} sm={4} xl={6}>
                <Item item={item} handleAddToCart={handleAddToCart} />
              </Grid>
            ))}
          </Grid>
          </Col>
        </Row>
    </Wrapper>
  );
}

export default App;
