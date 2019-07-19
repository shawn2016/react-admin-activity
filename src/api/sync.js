import { Router } from "express";
import resources from "../util/resources";
const router = new Router();
import dataFifter from "../util/dataFifter";

/**
 * 获取本地文件夹中的组件
 */
router.get("/components", async (req, res, next) => {
  try {
    const components = await resources.getComponents();
    res.status(200).send(dataFifter.success(components));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
