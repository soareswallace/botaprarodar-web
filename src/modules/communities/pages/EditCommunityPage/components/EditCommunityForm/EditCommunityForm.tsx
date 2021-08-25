import React, { useState } from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  Grid,
  CircularProgress,
} from '@material-ui/core';
import Community from 'modules/communities/models/Community';
import { useForm } from 'react-hook-form';
import { Input } from 'shared/components';
import CommunityService from 'modules/communities/services/CommunityService';
import { useHistory } from 'react-router-dom';
import useStyles from './EditCommunityForm.styles';

interface EditCommunitiProps {
  community?: Community;
}

const EditCommunityForm: React.FC<EditCommunitiProps> = ({ community }) => {
  const classes = useStyles();
  const history = useHistory();
  const { handleSubmit, control } = useForm();
  const [loading, setLoading] = useState(false);

  const onSubmit = (data: any) => {
    if (community?.id) {
      setLoading(true);
      CommunityService.editCommunityById(community.id, {
        ...community,
        ...data,
      })
        .then(() => {
          history.push('/comunidades');
        })
        .catch(err => {
          console.error(err);
        })
        .finally(() => {
          setLoading(false);
        });
    }
  };

  return (
    <Card className={classes.root}>
      <CardHeader
        title="Informações da comunidade"
        className={classes.header}
      />
      <hr />
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container direction="row" spacing={3}>
            <Grid item xs={12}>
              <Input
                label="Nome da comunidade"
                type="text"
                name="name"
                className={classes.input}
                control={control}
                dataTestId="name"
                defaultValue={community?.name}
                rules={{ required: 'Nome da comunidade é obrigatório' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Input
                label="Descrição"
                type="text"
                name="description"
                className={classes.input}
                control={control}
                dataTestId="description"
                defaultValue={community?.description}
                rules={{ required: 'Descrição da comunidade é obrigatória' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Input
                label="Nome do Gestor"
                type="text"
                name="org_name"
                className={classes.input}
                control={control}
                dataTestId="org_name"
                defaultValue={community?.org_name}
                rules={{ required: 'Nome do gestor é obrigatório' }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Input
                label="E-mail do Gestor"
                type="email"
                name="org_email"
                className={classes.input}
                control={control}
                dataTestId="org_email"
                defaultValue={community?.org_email}
                rules={{
                  required: 'E-mail do gestor é obrigatório',
                }}
              />
            </Grid>
          </Grid>
          <hr className={classes.buttonSeparator} />
          <Button
            data-testid="cancel-button"
            type="button"
            className={`${classes.buttonCancel}`}
            onClick={() => history.push('/comunidades')}
          >
            CANCELAR
          </Button>
          <Button
            data-testid="submit-button"
            type="submit"
            className={`${classes.buttonStyle}`}
            disabled={loading}
            startIcon={
              loading ? (
                <CircularProgress style={{ width: 23, height: 23 }} />
              ) : (
                ''
              )
            }
          >
            {loading ? 'ENVIANDO INFORMAÇÕES' : 'SALVAR ALTERAÇÕES'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default EditCommunityForm;