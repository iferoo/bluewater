import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import config from 'config';
// import Logo from 'ui-component/Logo';

import Logo from '../../../assets/images/logo.jpg';

// ==============================|| MAIN LOGO ||============================== //

export default function LogoSection() {
    const theme = useTheme();

    return (
        <ButtonBase disableRipple /*component={Link} to={config.defaultPath}*/>
            {/* <Logo /> */}
            {/* <h3 style={{ color: theme.palette.primary.dark }}>BLUEWATER-SAFARIS</h3> */}
            <img alt="test" src={Logo} style={{ width: '100px' }} />
        </ButtonBase>
    );
}
