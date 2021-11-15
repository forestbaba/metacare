const routes = (router, injector) => {
    router.get("/check", (req, res) => {
      res.status(200).send({ status: "OK" });
    });
};

module.exports = routes;
  