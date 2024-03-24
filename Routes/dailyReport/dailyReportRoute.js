const express = require("express");
const router = express.Router();

router.post("/crt");
router.post("/src");
router.post("/src/:id");
router.post("/del/:id");
