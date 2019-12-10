import React from 'react';
import { Grid } from '@material-ui/core';
import Layout from '../components/Layout';

export default function Dashboard() {
  return (
    <Layout>
      <Grid container xs={12}>
        <Grid container xs={4}>
          element1
        </Grid>
        <Grid container xs={8}>
          <Grid container xs={12}>
            element2
          </Grid>
          <Grid container xs={6}>
            element3
          </Grid>
          <Grid container xs={6}>
            element4
          </Grid>
        </Grid>
      </Grid>
    </Layout>
  );
}
