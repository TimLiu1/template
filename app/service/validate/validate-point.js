class validatePoint {
    static async inviteProcess(condition) {
        if (!condition.inviteId) {
            throw 'inviteId miss';
        }
        if (!condition.invitedId) {
            throw 'invitedId miss';
        }
        return condition;
    }
    static async registerReward(condition) {
        if (!condition.userId) {
            throw 'userId miss';
        }
        return condition;
    }
    
}

module.exports = validatePoint;