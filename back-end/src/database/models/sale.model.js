module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
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

  Sale.associate = (models) => {

    Sale.hasMany(models.SaleProduct,
      { foreignKey: 'sale_id', as: 'sales_products' });

    Sale.belongsTo(models.User,
      { foreignKey: 'user_id', as: 'user' });
    
    Sale.belongsTo(models.User,
      { foreignKey: 'seller_id', as: 'seller' });
  };

  return Sale;
};