import React, { useEffect, useState } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Loading } from 'shared/components';
import EmptyState from 'shared/components/EmptyState/EmptyState';
import { EmptyStateImage } from 'shared/assets/images';
import Community from '../../models/Community';
import CommunityService from '../../services/CommunityService';
import useStyles from './CommunityPage.styles';
import CommunityCard from './components/CommunityCard/CommunityCard';

const CommunityPage: React.FC = () => {
  const [communities, setCommunities] = useState<Community[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const classes = useStyles();

  useEffect(() => {
    CommunityService.getAllCommunities()
      .then(res => {
        setCommunities(res);
      })
      .catch(err => {
        console.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <Typography variant="h5" gutterBottom className={classes.pageTitle}>
        Comunidades do Bota pra Rodar
      </Typography>
      {loading ? (
        <Loading />
      ) : communities.length ? (
        <Grid container spacing={4} data-testid="communities-grid">
          {communities?.map(community => (
            <Grid
              key={community.id}
              item
              lg={3}
              md={6}
              sm={12}
              className={classes.card}
            >
              <CommunityCard key={community.id} community={community} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className={classes.emptyStateContainer}>
          <EmptyState
            imgSrc={EmptyStateImage}
            heading="Nenhuma comunidade cadastrada!"
            subheading="Cadastre uma nova comunidade em nosso aplicaticativo."
          />
        </div>
      )}
    </div>
  );
};

export default CommunityPage;