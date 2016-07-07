/**
 * Created by krimeshu on 2016/7/5.
 */
var os = require('os');
var childProcess = require('child_process');

var HostsEntity = require('./hosts-entity');

var HOSTS_PATH = os.platform() == 'win32' ?
    'C:/Windows/System32/drivers/etc/hosts' : '/etc/hosts';

module.exports = {
    // 测试
    'test': function () {
        var defaultHosts = new HostsEntity();
        defaultHosts.load(HOSTS_PATH);

        var line = new Array(81).join('*');

        console.log(line);
        console.log('Current active group: ' + defaultHosts.getActiveGroup());
        console.log('Group after active group: ' + defaultHosts.getGroupAfterActive());
        console.log(line);
        console.log(defaultHosts.stringify());

        console.log(line);
        console.log('Current active group: ' + defaultHosts.getActiveGroup());
        console.log('Group after active group: ' + defaultHosts.getGroupAfterActive());
        console.log(line);
        console.log(defaultHosts.stringify());
    },
    // 切换到下一个自定义分组
    'switchNext': function () {
        var defaultHosts = new HostsEntity();
        defaultHosts.load(HOSTS_PATH);

        console.log('\nSwitching active group to next...');
        defaultHosts.enableGroup(defaultHosts.getGroupAfterActive());
        defaultHosts.save();

        defaultHosts.printGroupState();

        this.flushDNS();
    },
    // 启用某个分组
    'enableGroup': function (groupName) {
        var defaultHosts = new HostsEntity();
        defaultHosts.load(HOSTS_PATH);

        console.log('\nSwitching active group to: ' + groupName);
        defaultHosts.enableGroup(groupName);
        defaultHosts.save();

        defaultHosts.printGroupState();

        this.flushDNS();
    },
    // 刷新DNS缓存
    'flushDNS': function () {
        var platform = os.platform();
        if (platform == 'win32' || platform == 'win64') {
            childProcess.exec('ipconfig /release && ipconfig /renew && ipconfig /flushdns', done);
        } else if (platform == 'darwin') {
            childProcess.exec('sudo killall -HUP mDNSResponder', done);
        } else if (platform == 'linux') {
            childProcess.exec('/etc/init.d/nscd restart', done);
        }
        function done() {
            console.log('\nDNS cache flushed!');
        }
    }
};
