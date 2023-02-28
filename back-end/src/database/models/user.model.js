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
      underscored: true,
    }
  );

  User.associate = (models) => {

    User.hasMany(models.Sale,
      { foreignKey: 'userId', as: 'customer' });
    
    User.hasMany(models.Sale,
      { foreignKey: 'sellerId', as: 'seller' });
  };

  return User;
};