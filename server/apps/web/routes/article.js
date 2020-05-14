module.exports = app => {
  const express = require("express");
  const router = express.Router({ mergeParams: true });
  const Category = require("./../../../libs/db/models/Category");
  const Article = require("./../../../libs/db/models/Article");

  router.get("/", async (req, res) => {
    let { category = "" } = req.query;
    let items = [];
    const parentCat = await Category.findOne({ name: category });
    let childCat = await Category.find({ pid: parentCat._id });
    childCat = childCat.map(cat => cat._id);

    switch (category) {
      case "news":
        let news = await Category.aggregate([
          {
            $match: { pid: parentCat._id },
          },
          {
            $lookup: {
              from: "articles",
              localField: "_id",
              foreignField: "categories",
              as: "newsList",
            },
          },
          {
            $addFields: {
              newsList: {
                $slice: ["$newsList", 5],
              },
            },
          },
        ]);

        let hotNewsList = await Article.aggregate([
          {
            $match: { categories: { $in: childCat } },
          },
          {
            $sample: { size: 5 },
          },
          {
            $lookup: {
              from: "categories",
              localField: "categories",
              foreignField: "_id",
              as: "categories",
            },
          },
        ]);

        news.unshift({
          name: "热门",
          newsList: hotNewsList,
        });

        items = news.map((item, index) => {
          item.newsList.map((n, i) => {
            n.category =
              item.name === "热门"
                ? n.categories[0].name
                : (n.category = item.name);
            return n;
          });
          return item;
        });

        break;
      case "strategy":
        let strategies = await Category.aggregate([
          {
            $match: { pid: parentCat._id },
          },
          {
            $lookup: {
              from: "articles",
              localField: "_id",
              foreignField: "categories",
              as: "strategyList",
            },
          },
        ]);

        strategies.unshift({
          name: "最新",
          strategyList: await Article.find({
            categories: { $in: childCat },
          })
            .limit(16)
            .sort({ createdAt: -1 }),
        });

        items = strategies;

        break;
      default:
        break;
    }
    res.send({
      success: true,
      message: "请求成功",
      data: items,
    });
  });

  app.use("/web/api/articles", router);
};