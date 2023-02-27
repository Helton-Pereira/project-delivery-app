module.exports = (sequelize, DataTypes) => {
  const Sales = sequelize.define('Sales', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    user_id: {
      allowNull: false,
      foreignKey: true,
      type: DataTypes.INTEGER,
    },
    seller_id: {
      allowNull: false,
      foreignKey: true,
      type: DataTypes.INTEGER,
    },
    total_price: {
      allowNull: false,
      type: DataTypes.DECIMAL(9,2),
    },
    delivery_address: {
      allowNull: false,
      type: DataTypes.STRING(100),
    },
    delivery_number: {
      allowNull: false,
      type: DataTypes.STRING(50),
    },
    sale_date: {
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
      underscored: false,
    }
  );

  Sales.associate = (models) => {

    Sales.hasMany(models.SalesProducts,
      { foreignKey: 'sale_id', as: 'sales_products' });

    Sales.belongsTo(models.User,
      { foreignKey: 'user_id', as: 'user' });
    
    Sales.belongsTo(models.User,
      { foreignKey: 'seller_id', as: 'seller' });
  };

  return Sales;
};