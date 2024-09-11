import Redirect from './Redirect';


const Guard = ({ children }: { children: any }) => {

    const token = "thisisamostsecuretoken";
    // const token = undefined;


    return token ? children : <Redirect />;
}

export default Guard;