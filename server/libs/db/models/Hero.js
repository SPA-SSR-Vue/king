const mongoose = require("mongoose");
const schema = new mongoose.Schema(
  {
    isHot: { type: Boolean },
    title: { type: String },
    name: { type: String },
    avatar: { type: String },
    coverImg: { type: String },
    categories: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Category" }],
    comment: {
      difficult: { type: Number },
      skill: { type: Number },
      attack: { type: Number },
      survive: { type: Number },
    },
    skillSug: {
      major: { type: mongoose.SchemaTypes.ObjectId, ref: "Skill" },
      minor: { type: mongoose.SchemaTypes.ObjectId, ref: "Skill" },
      summoners: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Skill" }],
    },
    items1: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
    items2: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Item" }],
    epigraphs: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Epigraph" }],
    usageTips: { type: String },
    fightingTips: { type: String },
    teamTips: { type: String },
    partners: [
      {
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
        desc: { type: String },
      },
    ],
    controllers: [
      {
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
        desc: { type: String },
      },
    ],
    restrainers: [
      {
        hero: { type: mongoose.SchemaTypes.ObjectId, ref: "Hero" },
        desc: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Hero", schema, "heroes");
