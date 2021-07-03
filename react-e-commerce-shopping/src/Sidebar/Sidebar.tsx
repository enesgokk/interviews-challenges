import {useState} from "react";
import Button from "@material-ui/core/Button";
import {CartItemType} from "../App";
import {Wrapper} from "./Sidebar.styles";

type Props={
	item: CartItemType;
	handleAddToCart:(clickedItem: CartItemType)=>void;
}

const Sidebar: React.FC<Props> = ({item}) =>(
	<Wrapper>
		<div>
			<h3>#{item.category}</h3>
		</div>
	</Wrapper>
)

export default Sidebar;