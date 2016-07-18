/*
Navicat MySQL Data Transfer

Source Server         : 本地测试
Source Server Version : 50538
Source Host           : localhost:3306
Source Database       : pizzacms

Target Server Type    : MYSQL
Target Server Version : 50538
File Encoding         : 65001

Date: 2016-07-16 15:06:38
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for pz_user_admin
-- ----------------------------
DROP TABLE IF EXISTS `pz_user_admin`;
CREATE TABLE `pz_user_admin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(30) NOT NULL DEFAULT '',
  `nickname` varchar(30) DEFAULT '' COMMENT '昵称',
  `password` varchar(100) NOT NULL DEFAULT '',
  `state` int(255) NOT NULL DEFAULT '0' COMMENT '状态',
  `salt` varchar(10) NOT NULL DEFAULT 'dx#$59',
  `userGroupId` int(11) DEFAULT '0' COMMENT '用户组id',
  `roleId` int(11) DEFAULT '0' COMMENT '角色id',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pz_user_admin
-- ----------------------------
INSERT INTO `pz_user_admin` VALUES ('1', 'root', '左盐', 'bb2cafa845f2b405d8ccbd6e00b87f88', '0', '14FDUoW0(6', '0', '0');
