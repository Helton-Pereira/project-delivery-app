module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    userId: {
      allowNull: false,
      foreignKey: true,
      type: DataTypes.INTEGER,
    },
    sellerId: {
      allowNull: false,
      foreignKey: true,
      type: DataTypes.INTEGER,
    },
    totalPrice: {
      allowNull: false,
      type: DataTypes.DECIMAL(9,2),
    },
    deliveryAddress: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    deliveryNumber: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    saleDate: {
      allowNull: false,
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    status: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
  },
    {
      timestamps: false,
      tableName: 'sales',
      underscored: true,
    }
  );

  Sale.associate = (models) => {

    Sale.hasMany(models.SaleProduct,
      { foreignKey: 'saleId', as: 'sales_products' });

    Sale.belongsTo(models.User,
      { foreignKey: 'userId', as: 'user' });
    
    Sale.belongsTo(models.User,
      { foreignKey: 'sellerId', as: 'seller' });
  };

  return Sale;
};