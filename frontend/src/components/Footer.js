import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
	return (
		<footer>
			<Container>
				<Row>
					<Col className='text-center py-3'>
						Copyright <i className="fa-regular fa-copyright"></i> 2022 Mace's Card Shop
					</Col>
				</Row>
			</Container>
		</footer>
	);
};

export default Footer;
