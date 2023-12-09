import _ from "lodash"

export const object = {
    isEqual: (obj1, obj2, ...fields) => {
        if(fields.length > 0) return _.isEqual(_.pick(obj1, ...fields), _.pick(obj2, ...fields))
        return _.isEqual(obj1, obj2)
    }
}