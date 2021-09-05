/**
 * 测试数据基础配置
 * 1. 服务器地址，这里是本地地址
 * 2. 获取不同用户角色的token, 暂时用不到
 */

//本地服务地址
exports.BASE_URL = 'http://localhost:3000/api';

//获取customer的token
exports.getCustomerToken = function(){
    return '111';
};

//获取admin的token
exports.getAdminToken = function(){
    return '222';
};
