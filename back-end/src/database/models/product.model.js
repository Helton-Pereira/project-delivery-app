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
    urlImage: {
      allowNull: false,
      type: DataTypes.STRING(200),
    },
  },
    {
      timestamps: false,
      tableName: 'products',
      underscored: true,
    }
  );

  Product.associate = (models) => {

    Product.hasMany(models.SaleProduct,
      { foreignKey: 'productId', as: 'sales_products' });
  };

  return Product;
};