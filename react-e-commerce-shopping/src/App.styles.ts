import styled from 'styled-components';
import IconButton from '@material-ui/core/IconButton';

export const Wrapper = styled.div`
	margin:40px;

	.navbar{
		position:sticky;
		top:0;
		z-index:999;
		display:flex;
		justify-content:space-around;
		margin-bottom:50px;
		border:1px solid lightgray;		
		border-radius:10px;
		align-items: center;
		background-color:lightgray		
	}

	.navbar > a {
		text-decoration:none;
		font-family:Arial, Helvetica, sans-serif;
		color:gray;
		cursor:pointer;
	}

	.navbar > a:hover {
		background-color: rgba(0, 0, 0, 0.04);
		border-radius:10px;
	}

	.sidebarItem{
		border:1px solid lightblue;
		border-radius:10px;
		position:sticky;
		top:70px;
		height:fit-content;
	}

	@media only screen and (max-width: 960px) {
  		.sidebarItem {
    		display:none;
  		}
	}

`;

export const StyledButton = styled(IconButton)`
	
`;



