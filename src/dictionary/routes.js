import w from './words';


const routes = {
    register: `/${w.register}`,
    login: `/${w.login}`,
    dashboard: '/',
    createCard: `/${w.create}-${w.card}`,
    inventory: `/${w.inventory}`
}

export default routes;
