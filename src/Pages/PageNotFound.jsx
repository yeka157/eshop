import React from 'react';
import { Text } from '@chakra-ui/react';

const PageNotFound = (props) => {

    return (
        <div className='container' style={{minHeight:'77vh', height:'77vh'}}>
            <Text textAlign='center' fontSize='6xl' style={{paddingTop : '65px'}}>404 Page Not Found</Text>
        </div>
    )
}

export default PageNotFound;