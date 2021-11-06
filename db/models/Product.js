const mongoose = require("mongoose");
const mongooseSlugPlugin = require("mongoose-slug-plugin");

const ProductSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    slug: String,
    image: { type: String },
    price: {
      type: Number,
      default: 5,
    },
    description: String,
    color: String,
    quantity: {
      type: Number,
      min: 0,
    },
    shop: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Shop",
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.plugin(mongooseSlugPlugin, { tmpl: "<%=name%>" });

module.exports = mongoose.model("Product", ProductSchema);
