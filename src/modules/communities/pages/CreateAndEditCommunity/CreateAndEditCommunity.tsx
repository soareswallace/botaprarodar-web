import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Community from 'modules/communities/models/Community';
import CommunityService from 'modules/communities/services/CommunityService';
import { Loading } from 'shared/components';
import FormHeader from 'shared/components/FormHeader/FormHeader';
import DeleteCommunityButton from './components/DeleteCommunityButton/DeleteCommunityButton';
import EditCommunityForm from './components/CommunityForm/CommunityForm';
import useStyles from './CreateAndEditCommunity.styles';

const EditCommunityPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const classes = useStyles();
  const [community, setCommunity] = useState<Community>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (id) {
      setLoading(true);
      CommunityService.getCommunityById(id)
        .then(res => {
          setCommunity(res);
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id]);

  return (
    <div className={classes.root}>
      <FormHeader
        link="/comunidades"
        title={
          community?.name ? `Editar ${community.name}` : 'Cadastrar comunidade'
        }
      />
      {loading ? (
        <Loading />
      ) : (
        <>
          <EditCommunityForm community={community} />
          {id && <DeleteCommunityButton communityId={id} />}
        </>
      )}
    </div>
  );
};

export default EditCommunityPage;
