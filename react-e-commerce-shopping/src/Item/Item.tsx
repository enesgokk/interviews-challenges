import {useState} from "react";
import Button from "@material-ui/core/Button";
import {CartItemType} from "../App";
import {Wrapper} from "./Item.styles";
import { Alert } from 'reactstrap';

type Props={
	item: CartItemType;
	handleAddToCart:(clickedItem: CartItemType)=>void;
}

const Item: React.FC<Props> = ({item, handleAddToCart}) =>(
	<Wrapper>
		<img src={item.image} alt={item.title} onClick={()=>alert("\n"+item.title+"\n\n"+item.description+"\n\n"+item.price+"$")}  />
		<div>
			<h3>{item.title}</h3>
			<p>{item.description}</p>
			<h3>{item.price}$</h3>
		</div>
		<Button onClick={()=>handleAddToCart(item)}>Add to cart</Button>
	</Wrapper>
)

export default Item;