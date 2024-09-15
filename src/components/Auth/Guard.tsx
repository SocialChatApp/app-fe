import { useSelector } from 'react-redux';
import Redirect from './Redirect';
import { RootState } from '../../redux/store';


const Guard = ({ children }: { children: any }) => {

    const { accessToken } = useSelector((store: RootState) => store.auth);

    return accessToken ? children : <Redirect />;
}

export default Guard;