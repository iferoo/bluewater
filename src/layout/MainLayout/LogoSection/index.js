import { Link } from 'react-router-dom';

// material-ui
import { ButtonBase } from '@mui/material';
import { useTheme } from '@mui/material/styles';

// project imports
import config from 'config';
import Logo from 'ui-component/Logo';

// ==============================|| MAIN LOGO ||============================== //

export default function LogoSection() {
    const theme = useTheme();

    return (
        <ButtonBase disableRipple /*component={Link} to={config.defaultPath}*/>
            {/* <Logo /> */}
            <h1 style={{ color: theme.palette.primary.dark }}>BLUE WATER</h1>
        </ButtonBase>
    );
}
