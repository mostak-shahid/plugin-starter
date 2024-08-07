import { __ } from '@wordpress/i18n';
import { Col, Container, Row } from 'react-bootstrap';
import data from '../data.json';
export default function Footer() {
	return (
		<section className="plugin-starter-footer">
			<Container fluid="fluid">
				<Row className="align-items-center">
					<Col className="col-lg-8 text-center text-lg-start mb-2 mb-lg-0 ">
						<div
							dangerouslySetInnerHTML={ {
								__html:
									__( 'Enjoyed ', 'woocommerce' ) +
									' <strong>"' +
									data.name +
									'"</strong>' +
									__(
										'? Please leave us a ',
										'woocommerce'
									) +
									'<a href="#">' +
									__( 'rating', 'woocommerce' ) +
									'</a>' +
									__(
										'. We really appreciate your support!',
										'woocommerce'
									),
							} }
						/>
						{  }
					</Col>
					<Col className="col-lg-4 text-center text-lg-end">
						<strong>{ __( 'Version', 'woocommerce' ) }</strong>:
						{ data.version }{ ' ' }
					</Col>
				</Row>
			</Container>
		</section>
	);
}
