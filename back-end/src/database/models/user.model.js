module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    role: {
      allowNull: false,
      type: DataTypes.STRING,
    }
  },
    {
      timestamps: false,
      tableName: 'users',
      underscored: false,
    }
  );

  User.associate = (models) => {

    User.hasMany(models.Sales,
      { foreignKey: 'user_id', as: 'sales' });
    
    User.hasMany(models.Sales,
      { foreignKey: 'seller_id', as: 'sales' });
  };

  return User;
};