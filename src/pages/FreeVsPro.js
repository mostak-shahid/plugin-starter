import {Table} from 'react-bootstrap';
// Import the FontAwesomeIcon component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// Import the specific solid home icon
import { faCheckCircle, faCircleXmark} from '@fortawesome/free-solid-svg-icons';
import { Layout } from '../layouts';
import {HorizontalMultiLevelNavbar, VerticalMultiLevelNavbar} from '../components/Menu/Menu';
const FreeVsPro = () => {
    return (        
        <Layout sidebarPosition="none">     
            <Table responsive bordered hover>
                <thead>
                    <tr>
                        <th>Features</th>
                        <th>Free</th>
                        <th>Pro</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Semi Design design draft.fig</td>
                        <td><FontAwesomeIcon icon={faCircleXmark} /></td>
                        <td><FontAwesomeIcon icon={faCheckCircle} /></td>
                    </tr>
                    <tr>
                        <td>Semi Design design draft.fig</td>
                        <td><FontAwesomeIcon icon={faCircleXmark} /></td>
                        <td><FontAwesomeIcon icon={faCheckCircle} /></td>
                    </tr>
                    <tr>
                        <td>Semi Design design draft.fig</td>
                        <td><FontAwesomeIcon icon={faCircleXmark} /></td>
                        <td><FontAwesomeIcon icon={faCheckCircle} /></td>
                    </tr>
                </tbody>
            </Table>
        </Layout>
    );
};
export default FreeVsPro;