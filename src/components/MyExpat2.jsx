import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';

import {
  Card,
  Fab,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  LinearProgress,
  CircularProgress,
  Grid,
  Tooltip,
  Badge,
  withStyles
} from '@material-ui/core';
import { Delete, VpnKeyOutlined } from '@material-ui/icons/';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUserOutlined';

import AddCircle from '@material-ui/icons/AddCircle';
import WorkOutline from '@material-ui/icons/WorkOutlineOutlined';
import Assignment from '@material-ui/icons/AssignmentOutlined';
import AccountBalance from '@material-ui/icons/AccountBalanceOutlined';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import Context from '../context/Context';

const useStyles = makeStyles(() => ({
  add: {
    padding: '20px'
  },
  parent: {
    width: '100%',
    height: '100%',

    display: 'flex',
    flexDirection: 'column'
  },
  childTop: {
    padding: '8px 8px 8px 16px',
    backgroundColor: 'rgba(255, 255, 255,0.85)'
  },
  childBottom: {
    padding: '8px',
    marginTop: '8px',
    flexGrow: '1',
    backgroundColor: 'rgba(255, 255, 255, 0.4)'
  },
  config: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  configTitle: {
    marginRight: '5px'
  },
  formControl: {
    width: '100%'
  },
  progressTitle: {
    marginTop: '10px',
    fontSize: '1rem',
    fontWeight: 'bold'
  },
  select: {
    flexGrow: '1',
    marginBottom: '20px',
    marginRight: '10px'
  },
  selectflex: {
    display: 'flex',
    alignItems: 'center'
  },
  wrapper: {
    padding: '40px 0',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255,0.85)',
    '&:hover': {
      backgroundColor: 'white'
    }
  },

  wrapper2: {
    padding: '41.5px 0',
    position: 'relative',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255,0.3)',

    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255,0.6)'
    }
  },

  fabProgress: {
    position: 'absolute',
    marginLeft: 'auto',
    marginRight: 'auto',
    left: '0',
    right: '0',
    zIndex: 1
  },
  iconOnTop: {
    zIndex: 2
  },
  listTitle: {
    fontSize: '1.5rem',
    color: 'white'
  },
  badge: {
    zIndex: '3'
  }
}));

const BorderLinearProgress = withStyles({
  root: {
    height: 15,
    width: '75%',
    borderRadius: 20,
    backgroundColor: 'rgba(255, 219, 122, 1)',
    margin: '10px 0'
  },
  bar: {
    borderRadius: 20,
    backgroundColor: 'rgba(229, 170, 75, 1)'
  }
})(LinearProgress);

const MyExpat2 = () => {
  const { setShow_ADD_DESTINATION } = React.useContext(Context);
  const { setShow_DELETE_DESTINATION } = React.useContext(Context);
  const { setFocusList } = React.useContext(Context);
  const { list } = React.useContext(Context);
  const classes = useStyles();
  const [country, setCountry] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [open2, setOpen2] = React.useState(false);
  let arrayOfBadges = list.map(el => el.tasks.filter(task => task.checked === false).length);
  let arrayOfProgress = list.map(
    (el, index) => ((el.tasks.length - arrayOfBadges[index]) * 100) / el.tasks.length
  );
  let globalProgress = Math.round(arrayOfProgress.reduce((a, b) => a + b) / arrayOfProgress.length);

  const handleChange = event => {
    setCountry(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
    setOpen2(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleOpen2 = () => {
    setOpen2(true);
  };
  return (
    <div className={classes.parent}>
      <Card className={classes.childTop} id="destination">
        <div className={classes.config}>
          <Typography variant="p" className={classes.configTitle}>
            Ajouter une destination
          </Typography>
          <IconButton color="primary" onClick={() => setShow_ADD_DESTINATION(true)}>
            <AddCircle fontSize="medium" />
          </IconButton>
        </div>
        <FormControl className={classes.formControl}>
          <div className={classes.selectflex}>
            <InputLabel id="demo-controlled-open-select-label">Destination</InputLabel>
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={country}
              onChange={handleChange}
              className={classes.select}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={10}>Morocco</MenuItem>
              <MenuItem value={20}>Germany</MenuItem>
              <MenuItem value={30}>Tunisia</MenuItem>
            </Select>

            <IconButton onClick={() => setShow_DELETE_DESTINATION(true)}>
              <Delete fontSize="medium" />
            </IconButton>
          </div>
        </FormControl>
        <div className={classes.progress}>
          <Typography color="primary" variant="h5" className={classes.progressTitle}>
            {globalProgress}% des tâches effectuées
          </Typography>
          <BorderLinearProgress variant="determinate" color="secondary" value={globalProgress} />
        </div>
      </Card>
      {/* deuxieme card */}
      <Card className={classes.childBottom}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h3" className={classes.listTitle}>
              Mes listes
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.wrapper}>
              <Badge badgeContent={arrayOfBadges[0]} color="primary" className={classes.badge}>
                <IconButton className={classes.iconOnTop} onClick={() => setFocusList(0)}>
                  <Tooltip title="Logement" placement="bottom">
                    <VpnKeyOutlined fontSize="large" />
                  </Tooltip>
                </IconButton>
              </Badge>
              <CircularProgress
                color="secondary"
                variant="determinate"
                value={arrayOfProgress[0]}
                size={70}
                className={classes.fabProgress}
              />
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.wrapper}>
              <Badge badgeContent={arrayOfBadges[1]} color="primary" className={classes.badge}>
                <IconButton className={classes.iconOnTop} onClick={() => setFocusList(1)}>
                  <Tooltip title="Assurances" placement="bottom">
                    <VerifiedUserIcon fontSize="large" />
                  </Tooltip>
                </IconButton>
              </Badge>
              <CircularProgress
                color="secondary"
                variant="determinate"
                value={arrayOfProgress[1]}
                size={70}
                className={classes.fabProgress}
              />
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.wrapper}>
              <Badge badgeContent={arrayOfBadges[2]} color="primary" className={classes.badge}>
                <IconButton className={classes.iconOnTop} onClick={() => setFocusList(2)}>
                  <Tooltip title="Santé" placement="bottom">
                    <FavoriteBorderIcon fontSize="large" />
                  </Tooltip>
                </IconButton>
              </Badge>
              <CircularProgress
                color="secondary"
                variant="determinate"
                value={arrayOfProgress[2]}
                size={70}
                className={classes.fabProgress}
              />
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.wrapper}>
              <Badge badgeContent={arrayOfBadges[3]} color="primary" className={classes.badge}>
                <IconButton className={classes.iconOnTop} onClick={() => setFocusList(3)}>
                  <Tooltip title="Emploi" placement="bottom">
                    <WorkOutline fontSize="large" />
                  </Tooltip>
                </IconButton>
              </Badge>
              <CircularProgress
                variant="determinate"
                color="secondary"
                value={arrayOfProgress[3]}
                size={70}
                className={classes.fabProgress}
              />
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.wrapper}>
              <Badge badgeContent={arrayOfBadges[4]} color="primary" className={classes.badge}>
                <IconButton className={classes.iconOnTop} onClick={() => setFocusList(4)}>
                  <Tooltip title="Administratif" placement="bottom">
                    <Assignment fontSize="large" />
                  </Tooltip>
                </IconButton>
              </Badge>
              <CircularProgress
                color="secondary"
                variant="determinate"
                value={arrayOfProgress[4]}
                size={70}
                className={classes.fabProgress}
              />
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.wrapper}>
              <Badge badgeContent={arrayOfBadges[5]} color="primary" className={classes.badge}>
                <IconButton className={classes.iconOnTop} onClick={() => setFocusList(5)}>
                  <Tooltip title="Banque" placement="bottom">
                    <AccountBalance fontSize="large" />
                  </Tooltip>
                </IconButton>
              </Badge>
              <CircularProgress
                color="secondary"
                variant="determinate"
                value={arrayOfProgress[5]}
                size={70}
                className={classes.fabProgress}
              />
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.wrapper2}>
              <Tooltip title="Ajouter ma propre liste" placement="bottom">
                <Fab color="primary" aria-label="add" onClick={handleOpen2}>
                  <AddIcon />
                </Fab>
              </Tooltip>
            </Card>
          </Grid>
        </Grid>
        <Dialog onClose={handleClose} open={open2}>
          <Card className={classes.add}>Cette fonctionnalité sera bientôt disponible.</Card>
        </Dialog>
      </Card>
    </div>
  );
};

export default MyExpat2;
