import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import MainPage from './pages/MainPage';
import PassageiroPage from './pages/PassageiroPage';
import VooPage from './pages/VooPage';
import ReservaPage from './pages/ReservaPage';
import CadastrarPassageiroPage from './pages/CadastrarPassageiroPage';
import CadastrarVooPage from './pages/CadastrarVooPage';
import EditarPassageiroPage from './pages/EditarPassageiroPage';
import EditarVooPage from './pages/EditarVooPage';
import ReservarVooPage from './pages/ReservarVooPage';
import { AuthProvider, useAuth } from './context/AuthContext';

// Componente de rota protegida
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { currentUser } = useAuth();
  
  return (
    <Route
      {...rest}
      render={props =>
        currentUser ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

const Routes = () => (
  <AuthProvider>
    <Switch>
      <Route exact path="/" component={LoginPage} />
      
      <PrivateRoute path="/main" component={MainPage} />
      <PrivateRoute path="/passageiros" component={PassageiroPage} />
      <PrivateRoute path="/cadastrar-passageiro" component={CadastrarPassageiroPage} />
      <PrivateRoute path="/editar-passageiro/:cpf" component={EditarPassageiroPage} />
      <PrivateRoute path="/voos" component={VooPage} />
      <PrivateRoute path="/cadastrar-voo" component={CadastrarVooPage} />
      <PrivateRoute path="/editar-voo/:id" component={EditarVooPage} />
      <PrivateRoute path="/reservas" component={ReservaPage} />
      <PrivateRoute path="/reservar-voo" component={ReservarVooPage} />
      
      <Redirect to="/" />
    </Switch>
  </AuthProvider>
);

export default Routes;