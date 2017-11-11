const User = require('./user')
const Address = require('./address')
const UserFeature = require('./userFeature')
const Feature = require('./feature')

/**
 * If we had any associations to make, this would be a great place to put them!
 * ex. if we had another model called BlogPost, we might say:
 *
 *    BlogPost.belongsTo(User)
 */

Address.belongsTo(User);
User.hasMany(Address);

UserFeature.belongsTo(User);
Feature.hasMany(User);

UserFeature.belongsTo(Feature);
Feature.hasMany(UserFeature);


/**
 * We'll export all of our models here, so that any time a module needs a model,
 * we can just require it from 'db/models'
 * for example, we can say: const {User} = require('../db/models')
 * instead of: const User = require('../db/models/user')
 */
module.exports = {
  User,
  Address,
  Feature,
  UserFeature
}
