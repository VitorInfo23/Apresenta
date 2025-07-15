import React from 'react';
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import PassageiroForm from '../components/passageiros/PassageiroForm';
import PassageiroList from '../components/passageiros/PassageiroList';

const PassageiroPage = () => {
  const { path } = useRouteMatch();

  return (
    <Switch>
      <Route exact path={path}>
        <PassageiroList />
      </Route>
      <Route path={`${path}/cadastrar`}>
        <PassageiroForm />
      </Route>
      <Route path={`${path}/editar/:cpf`}>
        <PassageiroForm />
      </Route>
    </Switch>
  );
};

export default PassageiroPage;