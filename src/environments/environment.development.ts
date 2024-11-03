export const environment = {
    production: false,
    BACKEND_URL: "http://localhost:8080/api",
    keycloak: {
        clientId: "pet-shop-ui",
        realm: "petshoprealm",
        issuer: "http://localhost:8180",
        redirectUrl: 'http://localhost:4200',
    }
};
