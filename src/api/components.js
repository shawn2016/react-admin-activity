import { Router } from "express";
import path from "path";
import Component from "../models/component";
import dataFifter from "../util/dataFifter";
import compile from "../util/compile";
import fs from "../util/fs";

const router = new Router();

router.get("/", async (req, res, next) => {
  try {
    let components = await Component.find({}).lean();
    if (req.query.withFileContent) {
      for (let i in components) {
        let component = components[i];
        let filePath = path.join(
          __dirname,
          "../../publish",
          component.project,
          "components",
          component.name,
          "Main.js"
        );
        component.fileContent = await fs.readFile(filePath);
      }
    }
    res.status(200).send(dataFifter.success(components));
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    // re compile
    await compile.compileComponent(req.body.project, req.body.name);
    const exists = await Component.checkExistsByProjectAndName(
      req.body.project,
      req.body.name
    );
    if (exists) {
      const affectedComponent = await Component.findOneAndUpdate(
        {
          project: req.body.project,
          name: req.body.name
        },
        {
          config: req.body.config
          // fileContent: data.fileContent.toString()
        }
      );
      const component = await Component.findById(affectedComponent._id);
      res.status(200).send(dataFifter.success(component));
    } else {
      // insert
      const component = new Component({
        project: req.body.project,
        name: req.body.name,
        config: req.body.config
        // fileContent: data.fileContent.toString()
      });
      const savedComponent = await component.save();
      res.status(200).send(dataFifter.success(savedComponent));
    }
  } catch (err) {
    next(err);
  }
});

router.delete("/:_id", async (req, res, next) => {
  try {
    const _id = req.params._id;
    const component = await Component.findOneAndRemove({ _id: _id });
    res.status(200).send(dataFifter.success(component));
  } catch (err) {
    next(err);
  }
});

module.exports = router;
