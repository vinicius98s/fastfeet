import sequelize from '@database';

export default function() {
  return Promise.all(
    Object.entries(sequelize.models).map(([_, model]) => {
      return model.destroy({ truncate: true, force: true });
    })
  );
}
