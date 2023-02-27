module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    price: {
      allowNull: false,
      type: DataTypes.DECIMAL(4,2),
    },
    url_image: {
      allowNull: false,
      type: DataTypes.STRING(200),
    },
  },
    {
      timestamps: false,
      tableName: 'products',
      underscored: false,
    }
  );

  Product.associate = (models) => {

    Product.hasMany(models.SaleProduct,
      { foreignKey: 'product_id', as: 'sales_products' });
  };

  return Sale;
};