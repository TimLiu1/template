

class serviceDao {
    static async list(connection, criteria) {
        logger.info('getUserList');
        if (!criteria.pageInfo) {
            criteria.pageInfo = {
                pageSize: 10000,
                pageIndex: 1
            };
        }
        let i = 1;
        let condition = criteria.condition;
        let pageInfo = criteria.pageInfo;
        let start = pageInfo.pageSize * (pageInfo.pageIndex - 1);

        logger.info('condition', condition);
        let sqlParam = [];
        let sql = 'select * from users a where 1=1 ';

        if (condition.id !== undefined) {
            sql += ' and a.id = $' + i + '';
            i++;
            sqlParam.push(condition.id);
        }
        if (condition.email !== undefined) {
            sql += ' and a.email = $' + i + '';
            i++;
            sqlParam.push(condition.email);
        }

        if (condition.username !== undefined) {
            sql += ' and a.username = $' + i + '';
            i++;
            sqlParam.push(condition.username);
        }
        if (condition.token !== undefined) {
            sql += ' and a.token = $' + i + '';
            i++;
            sqlParam.push(condition.token);
        }
        let sql_result = sql.replace('{0}', 'a.*');
        sql_result += ' limit ' + pageInfo.pageSize + ' offset ' + start;
        logger.info('sqlParam', sqlParam);
        let data = await connection.query(sql_result, sqlParam);
        // logger.info('count', count);
        let model = {
            data: data.rows[0],
            count: 0
        };
        // if (count && count[0]) {
        //     model.count = count[0].Count
        // }
        return model;
    }


    static async insertUser(connection, condition) {

        logger.info('insertUser', condition);
        let sql = 'insert into users(name,email,phone,password,"countryCode","registerType") values ($1,$2,$3,$4,$5,$6) RETURNING id';
        let obj = [
            condition.name,
            condition.email,
            condition.phone,
            condition.password,
            condition.countryCode,
            condition.registerType
            
        ];
        let result = await connection.query(sql, obj);
        return result.rows[0].id;
    }

    static async getOneUser(connection, condition) {
        logger.info('getOneUser', condition);
        let sql = 'select * from users a where 1=1 ';
        let i = 1;
        let sqlParam = [];
        if (condition.phone !== undefined) {
            sql += ' and a.phone = $' + i + '';
            i++;
            sqlParam.push(condition.phone);
        }
        if (condition.email !== undefined) {
            sql += ' and a.email = $' + i + '';
            i++;
            sqlParam.push(condition.email);
        }
        if (condition.password !== undefined) {
            sql += ' and a.password = $' + i + '';
            i++;
            sqlParam.push(condition.password);
        }
        if (condition.id !== undefined) {
            sql += ' and a.id = $' + i + '';
            i++;
            sqlParam.push(condition.id);
        }
        sql += ' order by  "createdAt" limit 1';
        let data = await connection.query(sql, sqlParam);
        let model = data.rows[0];
        return model;
    }

    static async updateUser(connection, condition) {
        logger.info('updateUser',condition);
        let sql_tpl = 'update users  set {0} "updatedAt" = CURRENT_TIMESTAMP  where {1} RETURNING id';
        let sql_set = '';
        let sql_1 = '';
        let sqlParam = [];
        let i = 1;
        if (condition.name != undefined) {
            sql_set += ' name = $' + i + ', ';
            i++;
            sqlParam.push(condition.name);
        }
        if (condition.phone != undefined) {
            sql_set += ' phone = $' + i + ', ';
            i++;
            sqlParam.push(condition.phone);
        }

        if (condition.bindLink != undefined) {
            sql_set += ' "bindLink" = $' + i + ', ';
            i++;
            sqlParam.push(condition.bindLink);
        }
        if (condition.email != undefined) {
            sql_set += ' email = $' + i + ', ';
            i++;
            sqlParam.push(condition.email);
        }

        if (condition.age != undefined) {
            sql_set += ' age = $' + i + ', ';
            i++;
            sqlParam.push(Number(condition.age));
        }

        if (condition.countryCodeName != undefined) {
            sql_set += ' countryCodeName = $' + i + ', ';
            i++;
            sqlParam.push(condition.countryCodeName);
        }

        if (condition.roleName != undefined) {
            sql_set += ' roleName = $' + i + ', ';
            i++;
            sqlParam.push(condition.roleName);
        }
        if (condition.userType != undefined) {
            sql_set += ' userType = $' + i + ', ';
            i++;
            sqlParam.push(condition.userType);
        }
        if (condition.address != undefined) {
            sql_set += ' address = $' + i + ', ';
            i++;
            sqlParam.push(condition.address);
        }
        if (condition.password !== undefined) {
            sql_set += ' password = $' + i + ', ';
            i++;
            sqlParam.push(condition.password);
        }
        if (condition.id != undefined) {
            sql_1 += ' id = $' + i + '';
            i++;
            sqlParam.push(Number(condition.id));
        }
        let sql = sql_tpl.replace('{0}', sql_set);
        sql = sql.replace('{1}', sql_1);
        logger.info('sql', sql);
        let result = await connection.query(sql, sqlParam);
        return result.rows[0].id;

    }
}
module.exports = serviceDao;




