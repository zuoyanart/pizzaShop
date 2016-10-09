/*
Navicat MySQL Data Transfer

Source Server         : 派
Source Server Version : 50552
Source Host           : 192.168.1.21:3306
Source Database       : pizzaShop

Target Server Type    : MYSQL
Target Server Version : 50552
File Encoding         : 65001

Date: 2016-10-09 20:06:36
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for ecs_account_log
-- ----------------------------
DROP TABLE IF EXISTS `ecs_account_log`;
CREATE TABLE `ecs_account_log` (
  `log_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` mediumint(8) unsigned NOT NULL,
  `user_money` decimal(10,2) NOT NULL,
  `frozen_money` decimal(10,2) NOT NULL,
  `rank_points` mediumint(9) NOT NULL,
  `pay_points` mediumint(9) NOT NULL,
  `change_time` int(10) unsigned NOT NULL,
  `change_desc` varchar(255) NOT NULL,
  `change_type` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`log_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_account_log
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_ad
-- ----------------------------
DROP TABLE IF EXISTS `ecs_ad`;
CREATE TABLE `ecs_ad` (
  `ad_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `position_id` smallint(5) unsigned NOT NULL DEFAULT '0',
  `media_type` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `ad_name` varchar(60) NOT NULL DEFAULT '',
  `ad_link` varchar(255) NOT NULL DEFAULT '',
  `ad_code` text NOT NULL,
  `start_time` int(11) NOT NULL DEFAULT '0',
  `end_time` int(11) NOT NULL DEFAULT '0',
  `link_man` varchar(60) NOT NULL DEFAULT '',
  `link_email` varchar(60) NOT NULL DEFAULT '',
  `link_phone` varchar(60) NOT NULL DEFAULT '',
  `click_count` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `enabled` tinyint(3) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`ad_id`),
  KEY `position_id` (`position_id`),
  KEY `enabled` (`enabled`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_ad
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_ad_custom
-- ----------------------------
DROP TABLE IF EXISTS `ecs_ad_custom`;
CREATE TABLE `ecs_ad_custom` (
  `ad_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `ad_type` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `ad_name` varchar(60) DEFAULT NULL,
  `add_time` int(10) unsigned NOT NULL DEFAULT '0',
  `content` mediumtext,
  `url` varchar(255) DEFAULT NULL,
  `ad_status` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`ad_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_ad_custom
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_ad_position
-- ----------------------------
DROP TABLE IF EXISTS `ecs_ad_position`;
CREATE TABLE `ecs_ad_position` (
  `position_id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `position_name` varchar(60) NOT NULL DEFAULT '',
  `ad_width` smallint(5) unsigned NOT NULL DEFAULT '0',
  `ad_height` smallint(5) unsigned NOT NULL DEFAULT '0',
  `position_desc` varchar(255) NOT NULL DEFAULT '',
  `position_style` text NOT NULL,
  PRIMARY KEY (`position_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_ad_position
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_admin_action
-- ----------------------------
DROP TABLE IF EXISTS `ecs_admin_action`;
CREATE TABLE `ecs_admin_action` (
  `action_id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `action_code` varchar(20) NOT NULL DEFAULT '',
  `relevance` varchar(20) NOT NULL DEFAULT '',
  PRIMARY KEY (`action_id`),
  KEY `parent_id` (`parent_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_admin_action
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_admin_log
-- ----------------------------
DROP TABLE IF EXISTS `ecs_admin_log`;
CREATE TABLE `ecs_admin_log` (
  `log_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `log_time` int(10) unsigned NOT NULL DEFAULT '0',
  `user_id` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `log_info` varchar(255) NOT NULL DEFAULT '',
  `ip_address` varchar(15) NOT NULL DEFAULT '',
  PRIMARY KEY (`log_id`),
  KEY `log_time` (`log_time`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_admin_log
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_admin_message
-- ----------------------------
DROP TABLE IF EXISTS `ecs_admin_message`;
CREATE TABLE `ecs_admin_message` (
  `message_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `sender_id` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `receiver_id` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `sent_time` int(11) unsigned NOT NULL DEFAULT '0',
  `read_time` int(11) unsigned NOT NULL DEFAULT '0',
  `readed` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `deleted` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `title` varchar(150) NOT NULL DEFAULT '',
  `message` text NOT NULL,
  PRIMARY KEY (`message_id`),
  KEY `sender_id` (`sender_id`,`receiver_id`),
  KEY `receiver_id` (`receiver_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_admin_message
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_admin_user
-- ----------------------------
DROP TABLE IF EXISTS `ecs_admin_user`;
CREATE TABLE `ecs_admin_user` (
  `user_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `user_name` varchar(60) NOT NULL DEFAULT '',
  `email` varchar(60) NOT NULL DEFAULT '',
  `password` varchar(32) NOT NULL DEFAULT '',
  `ec_salt` varchar(10) DEFAULT NULL,
  `add_time` int(11) NOT NULL DEFAULT '0',
  `last_login` int(11) NOT NULL DEFAULT '0',
  `last_ip` varchar(15) NOT NULL DEFAULT '',
  `action_list` text NOT NULL,
  `nav_list` text NOT NULL,
  `lang_type` varchar(50) NOT NULL DEFAULT '',
  `agency_id` smallint(5) unsigned NOT NULL,
  `suppliers_id` smallint(5) unsigned DEFAULT '0',
  `todolist` longtext,
  `role_id` smallint(5) DEFAULT NULL,
  `passport_uid` varchar(20) DEFAULT NULL,
  `yq_create_time` smallint(11) DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `user_name` (`user_name`),
  KEY `agency_id` (`agency_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_admin_user
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_adsense
-- ----------------------------
DROP TABLE IF EXISTS `ecs_adsense`;
CREATE TABLE `ecs_adsense` (
  `from_ad` smallint(5) NOT NULL DEFAULT '0',
  `referer` varchar(255) NOT NULL DEFAULT '',
  `clicks` int(10) unsigned NOT NULL DEFAULT '0',
  KEY `from_ad` (`from_ad`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_adsense
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_affiliate_log
-- ----------------------------
DROP TABLE IF EXISTS `ecs_affiliate_log`;
CREATE TABLE `ecs_affiliate_log` (
  `log_id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `order_id` mediumint(8) NOT NULL,
  `time` int(10) NOT NULL,
  `user_id` mediumint(8) NOT NULL,
  `user_name` varchar(60) DEFAULT NULL,
  `money` decimal(10,2) NOT NULL DEFAULT '0.00',
  `point` int(10) NOT NULL DEFAULT '0',
  `separate_type` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`log_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_affiliate_log
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_agency
-- ----------------------------
DROP TABLE IF EXISTS `ecs_agency`;
CREATE TABLE `ecs_agency` (
  `agency_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `agency_name` varchar(255) NOT NULL,
  `agency_desc` text NOT NULL,
  PRIMARY KEY (`agency_id`),
  KEY `agency_name` (`agency_name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_agency
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_area_region
-- ----------------------------
DROP TABLE IF EXISTS `ecs_area_region`;
CREATE TABLE `ecs_area_region` (
  `shipping_area_id` smallint(5) unsigned NOT NULL DEFAULT '0',
  `region_id` smallint(5) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`shipping_area_id`,`region_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_area_region
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_article
-- ----------------------------
DROP TABLE IF EXISTS `ecs_article`;
CREATE TABLE `ecs_article` (
  `article_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `cat_id` smallint(5) NOT NULL DEFAULT '0',
  `title` varchar(150) NOT NULL DEFAULT '',
  `content` longtext NOT NULL,
  `author` varchar(30) NOT NULL DEFAULT '',
  `author_email` varchar(60) NOT NULL DEFAULT '',
  `keywords` varchar(255) NOT NULL DEFAULT '',
  `article_type` tinyint(1) unsigned NOT NULL DEFAULT '2',
  `is_open` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `add_time` int(10) unsigned NOT NULL DEFAULT '0',
  `file_url` varchar(255) NOT NULL DEFAULT '',
  `open_type` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `link` varchar(255) NOT NULL DEFAULT '',
  `description` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`article_id`),
  KEY `cat_id` (`cat_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_article
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_article_cat
-- ----------------------------
DROP TABLE IF EXISTS `ecs_article_cat`;
CREATE TABLE `ecs_article_cat` (
  `cat_id` smallint(5) NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(255) NOT NULL DEFAULT '',
  `cat_type` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `keywords` varchar(255) NOT NULL DEFAULT '',
  `cat_desc` varchar(255) NOT NULL DEFAULT '',
  `sort_order` tinyint(3) unsigned NOT NULL DEFAULT '50',
  `show_in_nav` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `parent_id` smallint(5) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`cat_id`),
  KEY `cat_type` (`cat_type`),
  KEY `sort_order` (`sort_order`),
  KEY `parent_id` (`parent_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_article_cat
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_attribute
-- ----------------------------
DROP TABLE IF EXISTS `ecs_attribute`;
CREATE TABLE `ecs_attribute` (
  `attr_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `cat_id` smallint(5) unsigned NOT NULL DEFAULT '0',
  `attr_name` varchar(60) NOT NULL DEFAULT '',
  `attr_input_type` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `attr_type` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `attr_values` text NOT NULL,
  `attr_index` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `sort_order` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `is_linked` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `attr_group` tinyint(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`attr_id`),
  KEY `cat_id` (`cat_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_attribute
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_auction_log
-- ----------------------------
DROP TABLE IF EXISTS `ecs_auction_log`;
CREATE TABLE `ecs_auction_log` (
  `log_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `act_id` mediumint(8) unsigned NOT NULL,
  `bid_user` mediumint(8) unsigned NOT NULL,
  `bid_price` decimal(10,2) unsigned NOT NULL,
  `bid_time` int(10) unsigned NOT NULL,
  PRIMARY KEY (`log_id`),
  KEY `act_id` (`act_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_auction_log
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_auto_manage
-- ----------------------------
DROP TABLE IF EXISTS `ecs_auto_manage`;
CREATE TABLE `ecs_auto_manage` (
  `item_id` mediumint(8) NOT NULL,
  `type` varchar(10) NOT NULL,
  `starttime` int(10) NOT NULL,
  `endtime` int(10) NOT NULL,
  PRIMARY KEY (`item_id`,`type`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_auto_manage
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_back_goods
-- ----------------------------
DROP TABLE IF EXISTS `ecs_back_goods`;
CREATE TABLE `ecs_back_goods` (
  `rec_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `back_id` mediumint(8) unsigned DEFAULT '0',
  `goods_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `product_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `product_sn` varchar(60) DEFAULT NULL,
  `goods_name` varchar(120) DEFAULT NULL,
  `brand_name` varchar(60) DEFAULT NULL,
  `goods_sn` varchar(60) DEFAULT NULL,
  `is_real` tinyint(1) unsigned DEFAULT '0',
  `send_number` smallint(5) unsigned DEFAULT '0',
  `goods_attr` text,
  PRIMARY KEY (`rec_id`),
  KEY `back_id` (`back_id`),
  KEY `goods_id` (`goods_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_back_goods
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_back_order
-- ----------------------------
DROP TABLE IF EXISTS `ecs_back_order`;
CREATE TABLE `ecs_back_order` (
  `back_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `delivery_sn` varchar(20) NOT NULL,
  `order_sn` varchar(20) NOT NULL,
  `order_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `invoice_no` varchar(50) DEFAULT NULL,
  `add_time` int(10) unsigned DEFAULT '0',
  `shipping_id` tinyint(3) unsigned DEFAULT '0',
  `shipping_name` varchar(120) DEFAULT NULL,
  `user_id` mediumint(8) unsigned DEFAULT '0',
  `action_user` varchar(30) DEFAULT NULL,
  `consignee` varchar(60) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  `country` smallint(5) unsigned DEFAULT '0',
  `province` smallint(5) unsigned DEFAULT '0',
  `city` smallint(5) unsigned DEFAULT '0',
  `district` smallint(5) unsigned DEFAULT '0',
  `sign_building` varchar(120) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `zipcode` varchar(60) DEFAULT NULL,
  `tel` varchar(60) DEFAULT NULL,
  `mobile` varchar(60) DEFAULT NULL,
  `best_time` varchar(120) DEFAULT NULL,
  `postscript` varchar(255) DEFAULT NULL,
  `how_oos` varchar(120) DEFAULT NULL,
  `insure_fee` decimal(10,2) unsigned DEFAULT '0.00',
  `shipping_fee` decimal(10,2) unsigned DEFAULT '0.00',
  `update_time` int(10) unsigned DEFAULT '0',
  `suppliers_id` smallint(5) DEFAULT '0',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `return_time` int(10) unsigned DEFAULT '0',
  `agency_id` smallint(5) unsigned DEFAULT '0',
  PRIMARY KEY (`back_id`),
  KEY `user_id` (`user_id`),
  KEY `order_id` (`order_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_back_order
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_bonus_type
-- ----------------------------
DROP TABLE IF EXISTS `ecs_bonus_type`;
CREATE TABLE `ecs_bonus_type` (
  `type_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `type_name` varchar(60) NOT NULL DEFAULT '',
  `type_money` decimal(10,2) NOT NULL DEFAULT '0.00',
  `send_type` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `min_amount` decimal(10,2) unsigned NOT NULL DEFAULT '0.00',
  `max_amount` decimal(10,2) unsigned NOT NULL DEFAULT '0.00',
  `send_start_date` int(11) NOT NULL DEFAULT '0',
  `send_end_date` int(11) NOT NULL DEFAULT '0',
  `use_start_date` int(11) NOT NULL DEFAULT '0',
  `use_end_date` int(11) NOT NULL DEFAULT '0',
  `min_goods_amount` decimal(10,2) unsigned NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`type_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_bonus_type
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_booking_goods
-- ----------------------------
DROP TABLE IF EXISTS `ecs_booking_goods`;
CREATE TABLE `ecs_booking_goods` (
  `rec_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `email` varchar(60) NOT NULL DEFAULT '',
  `link_man` varchar(60) NOT NULL DEFAULT '',
  `tel` varchar(60) NOT NULL DEFAULT '',
  `goods_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `goods_desc` varchar(255) NOT NULL DEFAULT '',
  `goods_number` smallint(5) unsigned NOT NULL DEFAULT '0',
  `booking_time` int(10) unsigned NOT NULL DEFAULT '0',
  `is_dispose` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `dispose_user` varchar(30) NOT NULL DEFAULT '',
  `dispose_time` int(10) unsigned NOT NULL DEFAULT '0',
  `dispose_note` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`rec_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_booking_goods
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_brand
-- ----------------------------
DROP TABLE IF EXISTS `ecs_brand`;
CREATE TABLE `ecs_brand` (
  `brand_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `brand_name` varchar(60) NOT NULL DEFAULT '',
  `brand_logo` varchar(80) NOT NULL DEFAULT '',
  `brand_desc` text NOT NULL,
  `site_url` varchar(255) NOT NULL DEFAULT '',
  `sort_order` tinyint(3) unsigned NOT NULL DEFAULT '50',
  `is_show` tinyint(1) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`brand_id`),
  KEY `is_show` (`is_show`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_brand
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_card
-- ----------------------------
DROP TABLE IF EXISTS `ecs_card`;
CREATE TABLE `ecs_card` (
  `card_id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `card_name` varchar(120) NOT NULL DEFAULT '',
  `card_img` varchar(255) NOT NULL DEFAULT '',
  `card_fee` decimal(6,2) unsigned NOT NULL DEFAULT '0.00',
  `free_money` decimal(6,2) unsigned NOT NULL DEFAULT '0.00',
  `card_desc` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`card_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_card
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_cat_recommend
-- ----------------------------
DROP TABLE IF EXISTS `ecs_cat_recommend`;
CREATE TABLE `ecs_cat_recommend` (
  `cat_id` smallint(5) NOT NULL,
  `recommend_type` tinyint(1) NOT NULL,
  PRIMARY KEY (`cat_id`,`recommend_type`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_cat_recommend
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_category
-- ----------------------------
DROP TABLE IF EXISTS `ecs_category`;
CREATE TABLE `ecs_category` (
  `cat_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(90) NOT NULL DEFAULT '',
  `keywords` varchar(255) NOT NULL DEFAULT '',
  `cat_desc` varchar(255) NOT NULL DEFAULT '',
  `parent_id` smallint(5) unsigned NOT NULL DEFAULT '0',
  `sort_order` tinyint(1) unsigned NOT NULL DEFAULT '50',
  `template_file` varchar(50) NOT NULL DEFAULT '',
  `measure_unit` varchar(15) NOT NULL DEFAULT '',
  `show_in_nav` tinyint(1) NOT NULL DEFAULT '0',
  `style` varchar(150) NOT NULL,
  `is_show` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `grade` tinyint(4) NOT NULL DEFAULT '0',
  `filter_attr` varchar(255) NOT NULL DEFAULT '0',
  PRIMARY KEY (`cat_id`),
  KEY `parent_id` (`parent_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_category
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_collect_goods
-- ----------------------------
DROP TABLE IF EXISTS `ecs_collect_goods`;
CREATE TABLE `ecs_collect_goods` (
  `rec_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `goods_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `add_time` int(11) unsigned NOT NULL DEFAULT '0',
  `is_attention` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`rec_id`),
  KEY `user_id` (`user_id`),
  KEY `goods_id` (`goods_id`),
  KEY `is_attention` (`is_attention`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_collect_goods
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_comment
-- ----------------------------
DROP TABLE IF EXISTS `ecs_comment`;
CREATE TABLE `ecs_comment` (
  `comment_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `comment_type` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `id_value` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `email` varchar(60) NOT NULL DEFAULT '',
  `user_name` varchar(60) NOT NULL DEFAULT '',
  `content` text NOT NULL,
  `comment_rank` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `add_time` int(10) unsigned NOT NULL DEFAULT '0',
  `ip_address` varchar(15) NOT NULL DEFAULT '',
  `status` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `parent_id` int(10) unsigned NOT NULL DEFAULT '0',
  `user_id` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`comment_id`),
  KEY `parent_id` (`parent_id`),
  KEY `id_value` (`id_value`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_comment
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_crons
-- ----------------------------
DROP TABLE IF EXISTS `ecs_crons`;
CREATE TABLE `ecs_crons` (
  `cron_id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `cron_code` varchar(20) NOT NULL,
  `cron_name` varchar(120) NOT NULL,
  `cron_desc` text,
  `cron_order` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `cron_config` text NOT NULL,
  `thistime` int(10) NOT NULL DEFAULT '0',
  `nextime` int(10) NOT NULL,
  `day` tinyint(2) NOT NULL,
  `week` varchar(1) NOT NULL,
  `hour` varchar(2) NOT NULL,
  `minute` varchar(255) NOT NULL,
  `enable` tinyint(1) NOT NULL DEFAULT '1',
  `run_once` tinyint(1) NOT NULL DEFAULT '0',
  `allow_ip` varchar(100) NOT NULL DEFAULT '',
  `alow_files` varchar(255) NOT NULL,
  PRIMARY KEY (`cron_id`),
  KEY `nextime` (`nextime`),
  KEY `enable` (`enable`),
  KEY `cron_code` (`cron_code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_crons
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_delivery_goods
-- ----------------------------
DROP TABLE IF EXISTS `ecs_delivery_goods`;
CREATE TABLE `ecs_delivery_goods` (
  `rec_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `delivery_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `goods_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `product_id` mediumint(8) unsigned DEFAULT '0',
  `product_sn` varchar(60) DEFAULT NULL,
  `goods_name` varchar(120) DEFAULT NULL,
  `brand_name` varchar(60) DEFAULT NULL,
  `goods_sn` varchar(60) DEFAULT NULL,
  `is_real` tinyint(1) unsigned DEFAULT '0',
  `extension_code` varchar(30) DEFAULT NULL,
  `parent_id` mediumint(8) unsigned DEFAULT '0',
  `send_number` smallint(5) unsigned DEFAULT '0',
  `goods_attr` text,
  PRIMARY KEY (`rec_id`),
  KEY `delivery_id` (`delivery_id`,`goods_id`),
  KEY `goods_id` (`goods_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_delivery_goods
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_delivery_order
-- ----------------------------
DROP TABLE IF EXISTS `ecs_delivery_order`;
CREATE TABLE `ecs_delivery_order` (
  `delivery_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `delivery_sn` varchar(20) NOT NULL,
  `order_sn` varchar(20) NOT NULL,
  `order_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `invoice_no` varchar(50) DEFAULT NULL,
  `add_time` int(10) unsigned DEFAULT '0',
  `shipping_id` tinyint(3) unsigned DEFAULT '0',
  `shipping_name` varchar(120) DEFAULT NULL,
  `user_id` mediumint(8) unsigned DEFAULT '0',
  `action_user` varchar(30) DEFAULT NULL,
  `consignee` varchar(60) DEFAULT NULL,
  `address` varchar(250) DEFAULT NULL,
  `country` smallint(5) unsigned DEFAULT '0',
  `province` smallint(5) unsigned DEFAULT '0',
  `city` smallint(5) unsigned DEFAULT '0',
  `district` smallint(5) unsigned DEFAULT '0',
  `sign_building` varchar(120) DEFAULT NULL,
  `email` varchar(60) DEFAULT NULL,
  `zipcode` varchar(60) DEFAULT NULL,
  `tel` varchar(60) DEFAULT NULL,
  `mobile` varchar(60) DEFAULT NULL,
  `best_time` varchar(120) DEFAULT NULL,
  `postscript` varchar(255) DEFAULT NULL,
  `how_oos` varchar(120) DEFAULT NULL,
  `insure_fee` decimal(10,2) unsigned DEFAULT '0.00',
  `shipping_fee` decimal(10,2) unsigned DEFAULT '0.00',
  `update_time` int(10) unsigned DEFAULT '0',
  `suppliers_id` smallint(5) DEFAULT '0',
  `status` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `agency_id` smallint(5) unsigned DEFAULT '0',
  PRIMARY KEY (`delivery_id`),
  KEY `user_id` (`user_id`),
  KEY `order_id` (`order_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_delivery_order
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_email_list
-- ----------------------------
DROP TABLE IF EXISTS `ecs_email_list`;
CREATE TABLE `ecs_email_list` (
  `id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `email` varchar(60) NOT NULL,
  `stat` tinyint(1) NOT NULL DEFAULT '0',
  `hash` varchar(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_email_list
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_email_sendlist
-- ----------------------------
DROP TABLE IF EXISTS `ecs_email_sendlist`;
CREATE TABLE `ecs_email_sendlist` (
  `id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `email` varchar(100) NOT NULL,
  `template_id` mediumint(8) NOT NULL,
  `email_content` text NOT NULL,
  `error` tinyint(1) NOT NULL DEFAULT '0',
  `pri` tinyint(10) NOT NULL,
  `last_send` int(10) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_email_sendlist
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_error_log
-- ----------------------------
DROP TABLE IF EXISTS `ecs_error_log`;
CREATE TABLE `ecs_error_log` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `info` varchar(255) NOT NULL,
  `file` varchar(100) NOT NULL,
  `time` int(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `time` (`time`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_error_log
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_exchange_goods
-- ----------------------------
DROP TABLE IF EXISTS `ecs_exchange_goods`;
CREATE TABLE `ecs_exchange_goods` (
  `goods_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `exchange_integral` int(10) unsigned NOT NULL DEFAULT '0',
  `is_exchange` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `is_hot` tinyint(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`goods_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_exchange_goods
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_favourable_activity
-- ----------------------------
DROP TABLE IF EXISTS `ecs_favourable_activity`;
CREATE TABLE `ecs_favourable_activity` (
  `act_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `act_name` varchar(255) NOT NULL,
  `start_time` int(10) unsigned NOT NULL,
  `end_time` int(10) unsigned NOT NULL,
  `user_rank` varchar(255) NOT NULL,
  `act_range` tinyint(3) unsigned NOT NULL,
  `act_range_ext` varchar(255) NOT NULL,
  `min_amount` decimal(10,2) unsigned NOT NULL,
  `max_amount` decimal(10,2) unsigned NOT NULL,
  `act_type` tinyint(3) unsigned NOT NULL,
  `act_type_ext` decimal(10,2) unsigned NOT NULL,
  `gift` text NOT NULL,
  `sort_order` tinyint(3) unsigned NOT NULL DEFAULT '50',
  PRIMARY KEY (`act_id`),
  KEY `act_name` (`act_name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_favourable_activity
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_feedback
-- ----------------------------
DROP TABLE IF EXISTS `ecs_feedback`;
CREATE TABLE `ecs_feedback` (
  `msg_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `user_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `user_name` varchar(60) NOT NULL DEFAULT '',
  `user_email` varchar(60) NOT NULL DEFAULT '',
  `msg_title` varchar(200) NOT NULL DEFAULT '',
  `msg_type` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `msg_status` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `msg_content` text NOT NULL,
  `msg_time` int(10) unsigned NOT NULL DEFAULT '0',
  `message_img` varchar(255) NOT NULL DEFAULT '0',
  `order_id` int(11) unsigned NOT NULL DEFAULT '0',
  `msg_area` tinyint(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`msg_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_feedback
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_friend_link
-- ----------------------------
DROP TABLE IF EXISTS `ecs_friend_link`;
CREATE TABLE `ecs_friend_link` (
  `link_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `link_name` varchar(255) NOT NULL DEFAULT '',
  `link_url` varchar(255) NOT NULL DEFAULT '',
  `link_logo` varchar(255) NOT NULL DEFAULT '',
  `show_order` tinyint(3) unsigned NOT NULL DEFAULT '50',
  PRIMARY KEY (`link_id`),
  KEY `show_order` (`show_order`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_friend_link
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_goods_activity
-- ----------------------------
DROP TABLE IF EXISTS `ecs_goods_activity`;
CREATE TABLE `ecs_goods_activity` (
  `act_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `act_name` varchar(255) NOT NULL,
  `act_desc` text NOT NULL,
  `act_type` tinyint(3) unsigned NOT NULL,
  `goods_id` mediumint(8) unsigned NOT NULL,
  `product_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `goods_name` varchar(255) NOT NULL,
  `start_time` int(10) unsigned NOT NULL,
  `end_time` int(10) unsigned NOT NULL,
  `is_finished` tinyint(3) unsigned NOT NULL,
  `ext_info` text NOT NULL,
  PRIMARY KEY (`act_id`),
  KEY `act_name` (`act_name`,`act_type`,`goods_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_goods_activity
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_goods_article
-- ----------------------------
DROP TABLE IF EXISTS `ecs_goods_article`;
CREATE TABLE `ecs_goods_article` (
  `goods_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `article_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `admin_id` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`goods_id`,`article_id`,`admin_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_goods_article
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_goods_attr
-- ----------------------------
DROP TABLE IF EXISTS `ecs_goods_attr`;
CREATE TABLE `ecs_goods_attr` (
  `goods_attr_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `goods_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `attr_id` smallint(5) unsigned NOT NULL DEFAULT '0',
  `attr_value` text NOT NULL,
  `attr_price` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`goods_attr_id`),
  KEY `goods_id` (`goods_id`),
  KEY `attr_id` (`attr_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_goods_attr
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_goods_cat
-- ----------------------------
DROP TABLE IF EXISTS `ecs_goods_cat`;
CREATE TABLE `ecs_goods_cat` (
  `goods_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `cat_id` smallint(5) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`goods_id`,`cat_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_goods_cat
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_goods_type
-- ----------------------------
DROP TABLE IF EXISTS `ecs_goods_type`;
CREATE TABLE `ecs_goods_type` (
  `cat_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `cat_name` varchar(60) NOT NULL DEFAULT '',
  `enabled` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `attr_group` varchar(255) NOT NULL,
  PRIMARY KEY (`cat_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_goods_type
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_group_goods
-- ----------------------------
DROP TABLE IF EXISTS `ecs_group_goods`;
CREATE TABLE `ecs_group_goods` (
  `parent_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `goods_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `goods_price` decimal(10,2) unsigned NOT NULL DEFAULT '0.00',
  `admin_id` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`parent_id`,`goods_id`,`admin_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_group_goods
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_keywords
-- ----------------------------
DROP TABLE IF EXISTS `ecs_keywords`;
CREATE TABLE `ecs_keywords` (
  `date` date NOT NULL DEFAULT '0000-00-00',
  `searchengine` varchar(20) NOT NULL DEFAULT '',
  `keyword` varchar(90) NOT NULL DEFAULT '',
  `count` mediumint(8) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`date`,`searchengine`,`keyword`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_keywords
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_link_goods
-- ----------------------------
DROP TABLE IF EXISTS `ecs_link_goods`;
CREATE TABLE `ecs_link_goods` (
  `goods_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `link_goods_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `is_double` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `admin_id` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`goods_id`,`link_goods_id`,`admin_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_link_goods
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_mail_templates
-- ----------------------------
DROP TABLE IF EXISTS `ecs_mail_templates`;
CREATE TABLE `ecs_mail_templates` (
  `template_id` tinyint(1) unsigned NOT NULL AUTO_INCREMENT,
  `template_code` varchar(30) NOT NULL DEFAULT '',
  `is_html` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `template_subject` varchar(200) NOT NULL DEFAULT '',
  `template_content` text NOT NULL,
  `last_modify` int(10) unsigned NOT NULL DEFAULT '0',
  `last_send` int(10) unsigned NOT NULL DEFAULT '0',
  `type` varchar(10) NOT NULL,
  PRIMARY KEY (`template_id`),
  UNIQUE KEY `template_code` (`template_code`),
  KEY `type` (`type`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_mail_templates
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_member_price
-- ----------------------------
DROP TABLE IF EXISTS `ecs_member_price`;
CREATE TABLE `ecs_member_price` (
  `price_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `goods_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `user_rank` tinyint(3) NOT NULL DEFAULT '0',
  `user_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`price_id`),
  KEY `goods_id` (`goods_id`,`user_rank`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_member_price
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_nav
-- ----------------------------
DROP TABLE IF EXISTS `ecs_nav`;
CREATE TABLE `ecs_nav` (
  `id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `ctype` varchar(10) DEFAULT NULL,
  `cid` smallint(5) unsigned DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `ifshow` tinyint(1) NOT NULL,
  `vieworder` tinyint(1) NOT NULL,
  `opennew` tinyint(1) NOT NULL,
  `url` varchar(255) NOT NULL,
  `type` varchar(10) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `type` (`type`),
  KEY `ifshow` (`ifshow`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_nav
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_pack
-- ----------------------------
DROP TABLE IF EXISTS `ecs_pack`;
CREATE TABLE `ecs_pack` (
  `pack_id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `pack_name` varchar(120) NOT NULL DEFAULT '',
  `pack_img` varchar(255) NOT NULL DEFAULT '',
  `pack_fee` decimal(6,2) unsigned NOT NULL DEFAULT '0.00',
  `free_money` smallint(5) unsigned NOT NULL DEFAULT '0',
  `pack_desc` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`pack_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_pack
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_package_goods
-- ----------------------------
DROP TABLE IF EXISTS `ecs_package_goods`;
CREATE TABLE `ecs_package_goods` (
  `package_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `goods_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `product_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `goods_number` smallint(5) unsigned NOT NULL DEFAULT '1',
  `admin_id` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`package_id`,`goods_id`,`admin_id`,`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_package_goods
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_pay_log
-- ----------------------------
DROP TABLE IF EXISTS `ecs_pay_log`;
CREATE TABLE `ecs_pay_log` (
  `log_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `order_amount` decimal(10,2) unsigned NOT NULL,
  `order_type` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `is_paid` tinyint(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`log_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_pay_log
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_payment
-- ----------------------------
DROP TABLE IF EXISTS `ecs_payment`;
CREATE TABLE `ecs_payment` (
  `pay_id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `pay_code` varchar(20) NOT NULL DEFAULT '',
  `pay_name` varchar(120) NOT NULL DEFAULT '',
  `pay_fee` varchar(10) NOT NULL DEFAULT '0',
  `pay_desc` text NOT NULL,
  `pay_order` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `pay_config` text NOT NULL,
  `enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `is_cod` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `is_online` tinyint(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`pay_id`),
  UNIQUE KEY `pay_code` (`pay_code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_payment
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_plugins
-- ----------------------------
DROP TABLE IF EXISTS `ecs_plugins`;
CREATE TABLE `ecs_plugins` (
  `code` varchar(30) NOT NULL DEFAULT '',
  `version` varchar(10) NOT NULL DEFAULT '',
  `library` varchar(255) NOT NULL DEFAULT '',
  `assign` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `install_date` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_plugins
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_products
-- ----------------------------
DROP TABLE IF EXISTS `ecs_products`;
CREATE TABLE `ecs_products` (
  `product_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `goods_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `goods_attr` varchar(50) DEFAULT NULL,
  `product_sn` varchar(60) DEFAULT NULL,
  `product_number` mediumint(8) unsigned DEFAULT '0',
  PRIMARY KEY (`product_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_products
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_reg_extend_info
-- ----------------------------
DROP TABLE IF EXISTS `ecs_reg_extend_info`;
CREATE TABLE `ecs_reg_extend_info` (
  `Id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` mediumint(8) unsigned NOT NULL,
  `reg_field_id` int(10) unsigned NOT NULL,
  `content` text NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_reg_extend_info
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_reg_fields
-- ----------------------------
DROP TABLE IF EXISTS `ecs_reg_fields`;
CREATE TABLE `ecs_reg_fields` (
  `id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `reg_field_name` varchar(60) NOT NULL,
  `dis_order` tinyint(3) unsigned NOT NULL DEFAULT '100',
  `display` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `type` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `is_need` tinyint(1) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=100 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_reg_fields
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_region
-- ----------------------------
DROP TABLE IF EXISTS `ecs_region`;
CREATE TABLE `ecs_region` (
  `region_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` smallint(5) unsigned NOT NULL DEFAULT '0',
  `region_name` varchar(120) NOT NULL DEFAULT '',
  `region_type` tinyint(1) NOT NULL DEFAULT '2',
  `agency_id` smallint(5) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`region_id`),
  KEY `parent_id` (`parent_id`),
  KEY `region_type` (`region_type`),
  KEY `agency_id` (`agency_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_region
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_role
-- ----------------------------
DROP TABLE IF EXISTS `ecs_role`;
CREATE TABLE `ecs_role` (
  `role_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `role_name` varchar(60) NOT NULL DEFAULT '',
  `action_list` text NOT NULL,
  `role_describe` text,
  PRIMARY KEY (`role_id`),
  KEY `user_name` (`role_name`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_role
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_searchengine
-- ----------------------------
DROP TABLE IF EXISTS `ecs_searchengine`;
CREATE TABLE `ecs_searchengine` (
  `date` date NOT NULL DEFAULT '0000-00-00',
  `searchengine` varchar(20) NOT NULL DEFAULT '',
  `count` mediumint(8) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`date`,`searchengine`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_searchengine
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_sessions
-- ----------------------------
DROP TABLE IF EXISTS `ecs_sessions`;
CREATE TABLE `ecs_sessions` (
  `sesskey` char(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `expiry` int(10) unsigned NOT NULL DEFAULT '0',
  `userid` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `adminid` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `ip` char(15) NOT NULL DEFAULT '',
  `user_name` varchar(60) NOT NULL,
  `user_rank` tinyint(3) NOT NULL,
  `discount` decimal(3,2) NOT NULL,
  `email` varchar(60) NOT NULL,
  `data` char(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`sesskey`),
  KEY `expiry` (`expiry`)
) ENGINE=MEMORY DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_sessions
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_sessions_data
-- ----------------------------
DROP TABLE IF EXISTS `ecs_sessions_data`;
CREATE TABLE `ecs_sessions_data` (
  `sesskey` varchar(32) CHARACTER SET utf8 COLLATE utf8_bin NOT NULL DEFAULT '',
  `expiry` int(10) unsigned NOT NULL DEFAULT '0',
  `data` longtext NOT NULL,
  PRIMARY KEY (`sesskey`),
  KEY `expiry` (`expiry`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_sessions_data
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_shipping
-- ----------------------------
DROP TABLE IF EXISTS `ecs_shipping`;
CREATE TABLE `ecs_shipping` (
  `shipping_id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `shipping_code` varchar(20) NOT NULL DEFAULT '',
  `shipping_name` varchar(120) NOT NULL DEFAULT '',
  `shipping_desc` varchar(255) NOT NULL DEFAULT '',
  `insure` varchar(10) NOT NULL DEFAULT '0',
  `support_cod` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `enabled` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `shipping_print` text NOT NULL,
  `print_bg` varchar(255) DEFAULT NULL,
  `config_lable` text,
  `print_model` tinyint(1) DEFAULT '0',
  `shipping_order` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`shipping_id`),
  KEY `shipping_code` (`shipping_code`,`enabled`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_shipping
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_shipping_area
-- ----------------------------
DROP TABLE IF EXISTS `ecs_shipping_area`;
CREATE TABLE `ecs_shipping_area` (
  `shipping_area_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `shipping_area_name` varchar(150) NOT NULL DEFAULT '',
  `shipping_id` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `configure` text NOT NULL,
  PRIMARY KEY (`shipping_area_id`),
  KEY `shipping_id` (`shipping_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_shipping_area
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_shop_config
-- ----------------------------
DROP TABLE IF EXISTS `ecs_shop_config`;
CREATE TABLE `ecs_shop_config` (
  `id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` smallint(5) unsigned NOT NULL DEFAULT '0',
  `code` varchar(30) NOT NULL DEFAULT '',
  `type` varchar(10) NOT NULL DEFAULT '',
  `store_range` varchar(255) NOT NULL DEFAULT '',
  `store_dir` varchar(255) NOT NULL DEFAULT '',
  `value` text NOT NULL,
  `sort_order` tinyint(3) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `code` (`code`),
  KEY `parent_id` (`parent_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_shop_config
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_snatch_log
-- ----------------------------
DROP TABLE IF EXISTS `ecs_snatch_log`;
CREATE TABLE `ecs_snatch_log` (
  `log_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `snatch_id` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `user_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `bid_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `bid_time` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`log_id`),
  KEY `snatch_id` (`snatch_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_snatch_log
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_stats
-- ----------------------------
DROP TABLE IF EXISTS `ecs_stats`;
CREATE TABLE `ecs_stats` (
  `access_time` int(10) unsigned NOT NULL DEFAULT '0',
  `ip_address` varchar(15) NOT NULL DEFAULT '',
  `visit_times` smallint(5) unsigned NOT NULL DEFAULT '1',
  `browser` varchar(60) NOT NULL DEFAULT '',
  `system` varchar(20) NOT NULL DEFAULT '',
  `language` varchar(20) NOT NULL DEFAULT '',
  `area` varchar(30) NOT NULL DEFAULT '',
  `referer_domain` varchar(100) NOT NULL DEFAULT '',
  `referer_path` varchar(200) NOT NULL DEFAULT '',
  `access_url` varchar(255) NOT NULL DEFAULT '',
  KEY `access_time` (`access_time`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_stats
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_suppliers
-- ----------------------------
DROP TABLE IF EXISTS `ecs_suppliers`;
CREATE TABLE `ecs_suppliers` (
  `suppliers_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `suppliers_name` varchar(255) DEFAULT NULL,
  `suppliers_desc` mediumtext,
  `is_check` tinyint(1) unsigned NOT NULL DEFAULT '1',
  PRIMARY KEY (`suppliers_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_suppliers
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_tag
-- ----------------------------
DROP TABLE IF EXISTS `ecs_tag`;
CREATE TABLE `ecs_tag` (
  `tag_id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `user_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `goods_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `tag_words` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`tag_id`),
  KEY `user_id` (`user_id`),
  KEY `goods_id` (`goods_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_tag
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_template
-- ----------------------------
DROP TABLE IF EXISTS `ecs_template`;
CREATE TABLE `ecs_template` (
  `filename` varchar(30) NOT NULL DEFAULT '',
  `region` varchar(40) NOT NULL DEFAULT '',
  `library` varchar(40) NOT NULL DEFAULT '',
  `sort_order` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `id` smallint(5) unsigned NOT NULL DEFAULT '0',
  `number` tinyint(1) unsigned NOT NULL DEFAULT '5',
  `type` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `theme` varchar(60) NOT NULL DEFAULT '',
  `remarks` varchar(30) NOT NULL DEFAULT '',
  KEY `filename` (`filename`,`region`),
  KEY `theme` (`theme`),
  KEY `remarks` (`remarks`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_template
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_topic
-- ----------------------------
DROP TABLE IF EXISTS `ecs_topic`;
CREATE TABLE `ecs_topic` (
  `topic_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL DEFAULT '''''',
  `intro` text NOT NULL,
  `start_time` int(11) NOT NULL DEFAULT '0',
  `end_time` int(10) NOT NULL DEFAULT '0',
  `data` text NOT NULL,
  `template` varchar(255) NOT NULL DEFAULT '''''',
  `css` text NOT NULL,
  `topic_img` varchar(255) DEFAULT NULL,
  `title_pic` varchar(255) DEFAULT NULL,
  `base_style` char(6) DEFAULT NULL,
  `htmls` mediumtext,
  `keywords` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  KEY `topic_id` (`topic_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_topic
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_user_account
-- ----------------------------
DROP TABLE IF EXISTS `ecs_user_account`;
CREATE TABLE `ecs_user_account` (
  `id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `admin_user` varchar(255) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `add_time` int(10) NOT NULL DEFAULT '0',
  `paid_time` int(10) NOT NULL DEFAULT '0',
  `admin_note` varchar(255) NOT NULL,
  `user_note` varchar(255) NOT NULL,
  `process_type` tinyint(1) NOT NULL DEFAULT '0',
  `payment` varchar(90) NOT NULL,
  `is_paid` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `user_id` (`user_id`),
  KEY `is_paid` (`is_paid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_user_account
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_user_bonus
-- ----------------------------
DROP TABLE IF EXISTS `ecs_user_bonus`;
CREATE TABLE `ecs_user_bonus` (
  `bonus_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `bonus_type_id` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `bonus_sn` bigint(20) unsigned NOT NULL DEFAULT '0',
  `user_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `used_time` int(10) unsigned NOT NULL DEFAULT '0',
  `order_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `emailed` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`bonus_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_user_bonus
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_user_feed
-- ----------------------------
DROP TABLE IF EXISTS `ecs_user_feed`;
CREATE TABLE `ecs_user_feed` (
  `feed_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `value_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `goods_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `feed_type` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `is_feed` tinyint(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`feed_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_user_feed
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_user_rank
-- ----------------------------
DROP TABLE IF EXISTS `ecs_user_rank`;
CREATE TABLE `ecs_user_rank` (
  `rank_id` tinyint(3) unsigned NOT NULL AUTO_INCREMENT,
  `rank_name` varchar(30) NOT NULL DEFAULT '',
  `min_points` int(10) unsigned NOT NULL DEFAULT '0',
  `max_points` int(10) unsigned NOT NULL DEFAULT '0',
  `discount` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `show_price` tinyint(1) unsigned NOT NULL DEFAULT '1',
  `special_rank` tinyint(1) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`rank_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_user_rank
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_virtual_card
-- ----------------------------
DROP TABLE IF EXISTS `ecs_virtual_card`;
CREATE TABLE `ecs_virtual_card` (
  `card_id` mediumint(8) NOT NULL AUTO_INCREMENT,
  `goods_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `card_sn` varchar(60) NOT NULL DEFAULT '',
  `card_password` varchar(60) NOT NULL DEFAULT '',
  `add_date` int(11) NOT NULL DEFAULT '0',
  `end_date` int(11) NOT NULL DEFAULT '0',
  `is_saled` tinyint(1) NOT NULL DEFAULT '0',
  `order_sn` varchar(20) NOT NULL DEFAULT '',
  `crc32` varchar(12) NOT NULL DEFAULT '0',
  PRIMARY KEY (`card_id`),
  KEY `goods_id` (`goods_id`),
  KEY `car_sn` (`card_sn`),
  KEY `is_saled` (`is_saled`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_virtual_card
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_volume_price
-- ----------------------------
DROP TABLE IF EXISTS `ecs_volume_price`;
CREATE TABLE `ecs_volume_price` (
  `price_type` tinyint(1) unsigned NOT NULL,
  `goods_id` mediumint(8) unsigned NOT NULL,
  `volume_number` smallint(5) unsigned NOT NULL DEFAULT '0',
  `volume_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`price_type`,`goods_id`,`volume_number`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_volume_price
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_vote
-- ----------------------------
DROP TABLE IF EXISTS `ecs_vote`;
CREATE TABLE `ecs_vote` (
  `vote_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `vote_name` varchar(250) NOT NULL DEFAULT '',
  `start_time` int(11) unsigned NOT NULL DEFAULT '0',
  `end_time` int(11) unsigned NOT NULL DEFAULT '0',
  `can_multi` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `vote_count` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`vote_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_vote
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_vote_log
-- ----------------------------
DROP TABLE IF EXISTS `ecs_vote_log`;
CREATE TABLE `ecs_vote_log` (
  `log_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `vote_id` smallint(5) unsigned NOT NULL DEFAULT '0',
  `ip_address` varchar(15) NOT NULL DEFAULT '',
  `vote_time` int(10) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`log_id`),
  KEY `vote_id` (`vote_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_vote_log
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_vote_option
-- ----------------------------
DROP TABLE IF EXISTS `ecs_vote_option`;
CREATE TABLE `ecs_vote_option` (
  `option_id` smallint(5) unsigned NOT NULL AUTO_INCREMENT,
  `vote_id` smallint(5) unsigned NOT NULL DEFAULT '0',
  `option_name` varchar(250) NOT NULL DEFAULT '',
  `option_count` int(8) unsigned NOT NULL DEFAULT '0',
  `option_order` tinyint(3) unsigned NOT NULL DEFAULT '100',
  PRIMARY KEY (`option_id`),
  KEY `vote_id` (`vote_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_vote_option
-- ----------------------------

-- ----------------------------
-- Table structure for ecs_wholesale
-- ----------------------------
DROP TABLE IF EXISTS `ecs_wholesale`;
CREATE TABLE `ecs_wholesale` (
  `act_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `goods_id` mediumint(8) unsigned NOT NULL,
  `goods_name` varchar(255) NOT NULL,
  `rank_ids` varchar(255) NOT NULL,
  `prices` text NOT NULL,
  `enabled` tinyint(3) unsigned NOT NULL,
  PRIMARY KEY (`act_id`),
  KEY `goods_id` (`goods_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of ecs_wholesale
-- ----------------------------

-- ----------------------------
-- Table structure for pz_action
-- ----------------------------
DROP TABLE IF EXISTS `pz_action`;
CREATE TABLE `pz_action` (
  `actionId` int(11) NOT NULL AUTO_INCREMENT,
  `actionName` varchar(255) NOT NULL DEFAULT '' COMMENT '动作名称',
  `action` varchar(255) NOT NULL DEFAULT '' COMMENT '动作编码，英文或数字',
  `actionModelId` int(11) DEFAULT '0' COMMENT '栏目模块id',
  `actionState` int(255) DEFAULT '0' COMMENT '动作状态,0有效',
  PRIMARY KEY (`actionId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pz_action
-- ----------------------------

-- ----------------------------
-- Table structure for pz_actionmodel
-- ----------------------------
DROP TABLE IF EXISTS `pz_actionmodel`;
CREATE TABLE `pz_actionmodel` (
  `actionModelId` int(11) NOT NULL AUTO_INCREMENT,
  `actionModelName` varchar(255) NOT NULL DEFAULT '' COMMENT '栏目模块名称',
  `actionModel` varchar(255) NOT NULL DEFAULT '' COMMENT '栏目模块编码',
  `actionModelState` int(255) DEFAULT '0' COMMENT '栏目模块状态',
  PRIMARY KEY (`actionModelId`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pz_actionmodel
-- ----------------------------

-- ----------------------------
-- Table structure for pz_article
-- ----------------------------
DROP TABLE IF EXISTS `pz_article`;
CREATE TABLE `pz_article` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(50) DEFAULT '',
  `timg` varchar(100) DEFAULT '',
  `content` varchar(10000) DEFAULT '',
  `brief` varchar(255) DEFAULT '',
  `nodeid` int(11) DEFAULT '0',
  `count` int(11) DEFAULT '0',
  `reco` int(11) DEFAULT '0',
  `uid` int(11) NOT NULL DEFAULT '0',
  `pass` int(11) DEFAULT '0',
  `source` varchar(100) DEFAULT '',
  `tags` varchar(100) DEFAULT '',
  `link` varchar(100) DEFAULT '',
  `comment` int(11) DEFAULT '0',
  `state` int(11) DEFAULT '0',
  `createtime` int(11) DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `page` (`id`,`title`,`nodeid`) USING HASH
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pz_article
-- ----------------------------
INSERT INTO `pz_article` VALUES ('1', '丈夫将老婆名写篮球上 一生气就打被判定家暴1', '/upload/2016/03/12/_3sw2_2acltjopcrqv5brhmhxlzst7wl.jpg', '<div class=\"otitle\" style=\"padding:0px;margin:20px 0px 0px;font-size:14px;color:#252525;font-family:宋体, sans-serif;background-color:#FFFFFF;\">\n	（原标题：他把老婆名字写在篮球上 拍球时不停地说“打死你”）\n</div>\n<div id=\"endText\" class=\"end-text\" style=\"padding:0px 0px 20px;margin:0px 10px 0px 0px;text-align:justify;font-size:16px;color:#252525;font-family:宋体, sans-serif;background-color:#FFFFFF;\">\n	<p style=\"text-indent:2em;\">\n		3月1日，我国第一部《反家庭暴力法》正式实施，意味着家庭暴力属于“家务事”的时代正式终结。除了大家都清楚的，家庭成员之间的侵害行为，属于家庭暴力。反家暴法还适用于具有共同生活关系的成员，也就是说，情侣同居出现殴打、谩骂等行为，也是家庭暴力。\n	</p>\n	<p style=\"text-indent:2em;\">\n		3月10日上午，是反家暴法生效的第十天，区妇联联合区委政法委、区司法局、区公安局，开展了《反家庭暴力法》业务知识培训。参加会议的有全区妇女代表以及司法局、公安局等相关科室人员，共计200余人参加。\n	</p>\n	<p style=\"text-indent:2em;\">\n		培训会邀请了重庆市经管学院心理学教授、全国公安系统优秀教师郭子贤教授。会上，郭教授用简洁易懂的方式，给大家诠释了反家庭暴力的相关条款。“不孝子女殴打父母，或者妻子殴打丈夫，这些也是家庭暴力。”郭教授说，只要是发生在家庭成员之间的侵害行为，都属于家庭暴力。\n	</p>\n	<p style=\"text-indent:2em;\">\n		“同居之间的恋人，一方殴打另一方，也是家庭暴力。”郭教授介绍，如今只要是具有共同生活关系，比如同居、扶养、寄养等，他们之间出现的殴打、谩骂，都能算作家庭暴力。\n	</p>\n	<p style=\"text-indent:2em;\">\n		而人们很少意识到的恐吓，也是家庭暴力的一种。郭教授说，在他接触过的案例中，曾有一个丈夫，因为对妻子不满。便在家中放置了很多篮球，篮球上写上妻子的名字。每天闲来无事，他便拍打篮球，同时口中念念有词“×××，打死你！”等等。\n	</p>\n	<p style=\"text-indent:2em;\">\n		时间一长，妻子的精神受到了极大的伤害，以至于她一听到“篮球”二字就会浑身发抖，要是听到打篮球的声音，就会抱头躲开。最后，经过调查，判定丈夫的这种行为已经构成了家庭暴力。\n	</p>\n</div>', '3月1日，我国第一部《反家庭暴力法》正式实施，意味着家庭暴力属于“家务事”的时代正式终结。除了大家都清楚的，家庭成员之间的侵害行为，属于家庭暴力。反家暴法还适用于具有共同生活关系的成员，也就是说，情侣同居出现殴打、谩骂等行为，也是家庭暴力。', '8', '0', '0', '1', '1', '网易新闻', '家暴 反家庭暴力法', 'http://www.baidu.com', '0', '0', '1457779085');
INSERT INTO `pz_article` VALUES ('2', '丈夫将老婆名写篮球上 一生气就打被判定家暴2', '/upload/2016/03/12/_3sw2_2acltjopcrqv5brhmhxlzst7wl.jpg', '<div class=\"otitle\" style=\"padding:0px;margin:20px 0px 0px;font-size:14px;color:#252525;font-family:宋体, sans-serif;background-color:#FFFFFF;\">\n	（原标题：他把老婆名字写在篮球上 拍球时不停地说“打死你”）\n</div>\n<div id=\"endText\" class=\"end-text\" style=\"padding:0px 0px 20px;margin:0px 10px 0px 0px;text-align:justify;font-size:16px;color:#252525;font-family:宋体, sans-serif;background-color:#FFFFFF;\">\n	<p style=\"text-indent:2em;\">\n		3月1日，我国第一部《反家庭暴力法》正式实施，意味着家庭暴力属于“家务事”的时代正式终结。除了大家都清楚的，家庭成员之间的侵害行为，属于家庭暴力。反家暴法还适用于具有共同生活关系的成员，也就是说，情侣同居出现殴打、谩骂等行为，也是家庭暴力。\n	</p>\n	<p style=\"text-indent:2em;\">\n		3月10日上午，是反家暴法生效的第十天，区妇联联合区委政法委、区司法局、区公安局，开展了《反家庭暴力法》业务知识培训。参加会议的有全区妇女代表以及司法局、公安局等相关科室人员，共计200余人参加。\n	</p>\n	<p style=\"text-indent:2em;\">\n		培训会邀请了重庆市经管学院心理学教授、全国公安系统优秀教师郭子贤教授。会上，郭教授用简洁易懂的方式，给大家诠释了反家庭暴力的相关条款。“不孝子女殴打父母，或者妻子殴打丈夫，这些也是家庭暴力。”郭教授说，只要是发生在家庭成员之间的侵害行为，都属于家庭暴力。\n	</p>\n	<p style=\"text-indent:2em;\">\n		“同居之间的恋人，一方殴打另一方，也是家庭暴力。”郭教授介绍，如今只要是具有共同生活关系，比如同居、扶养、寄养等，他们之间出现的殴打、谩骂，都能算作家庭暴力。\n	</p>\n	<p style=\"text-indent:2em;\">\n		而人们很少意识到的恐吓，也是家庭暴力的一种。郭教授说，在他接触过的案例中，曾有一个丈夫，因为对妻子不满。便在家中放置了很多篮球，篮球上写上妻子的名字。每天闲来无事，他便拍打篮球，同时口中念念有词“×××，打死你！”等等。\n	</p>\n	<p style=\"text-indent:2em;\">\n		时间一长，妻子的精神受到了极大的伤害，以至于她一听到“篮球”二字就会浑身发抖，要是听到打篮球的声音，就会抱头躲开。最后，经过调查，判定丈夫的这种行为已经构成了家庭暴力。\n	</p>\n</div>', '3月1日，我国第一部《反家庭暴力法》正式实施，意味着家庭暴力属于“家务事”的时代正式终结。除了大家都清楚的，家庭成员之间的侵害行为，属于家庭暴力。反家暴法还适用于具有共同生活关系的成员，也就是说，情侣同居出现殴打、谩骂等行为，也是家庭暴力。', '12', '0', '0', '1', '1', '网易新闻', '家暴 反家庭暴力法', 'http://www.baidu.com', '0', '0', '1457779085');
INSERT INTO `pz_article` VALUES ('3', '丈夫将老婆名写篮球上 一生气就打被判定家暴3', '/upload/2016/03/12/_3sw2_2acltjopcrqv5brhmhxlzst7wl.jpg', '<div class=\"otitle\" style=\"padding:0px;margin:20px 0px 0px;font-size:14px;color:#252525;font-family:宋体, sans-serif;background-color:#FFFFFF;\">\n	（原标题：他把老婆名字写在篮球上 拍球时不停地说“打死你”）\n</div>\n<div id=\"endText\" class=\"end-text\" style=\"padding:0px 0px 20px;margin:0px 10px 0px 0px;text-align:justify;font-size:16px;color:#252525;font-family:宋体, sans-serif;background-color:#FFFFFF;\">\n	<p style=\"text-indent:2em;\">\n		3月1日，我国第一部《反家庭暴力法》正式实施，意味着家庭暴力属于“家务事”的时代正式终结。除了大家都清楚的，家庭成员之间的侵害行为，属于家庭暴力。反家暴法还适用于具有共同生活关系的成员，也就是说，情侣同居出现殴打、谩骂等行为，也是家庭暴力。\n	</p>\n	<p style=\"text-indent:2em;\">\n		3月10日上午，是反家暴法生效的第十天，区妇联联合区委政法委、区司法局、区公安局，开展了《反家庭暴力法》业务知识培训。参加会议的有全区妇女代表以及司法局、公安局等相关科室人员，共计200余人参加。\n	</p>\n	<p style=\"text-indent:2em;\">\n		培训会邀请了重庆市经管学院心理学教授、全国公安系统优秀教师郭子贤教授。会上，郭教授用简洁易懂的方式，给大家诠释了反家庭暴力的相关条款。“不孝子女殴打父母，或者妻子殴打丈夫，这些也是家庭暴力。”郭教授说，只要是发生在家庭成员之间的侵害行为，都属于家庭暴力。\n	</p>\n	<p style=\"text-indent:2em;\">\n		“同居之间的恋人，一方殴打另一方，也是家庭暴力。”郭教授介绍，如今只要是具有共同生活关系，比如同居、扶养、寄养等，他们之间出现的殴打、谩骂，都能算作家庭暴力。\n	</p>\n	<p style=\"text-indent:2em;\">\n		而人们很少意识到的恐吓，也是家庭暴力的一种。郭教授说，在他接触过的案例中，曾有一个丈夫，因为对妻子不满。便在家中放置了很多篮球，篮球上写上妻子的名字。每天闲来无事，他便拍打篮球，同时口中念念有词“×××，打死你！”等等。\n	</p>\n	<p style=\"text-indent:2em;\">\n		时间一长，妻子的精神受到了极大的伤害，以至于她一听到“篮球”二字就会浑身发抖，要是听到打篮球的声音，就会抱头躲开。最后，经过调查，判定丈夫的这种行为已经构成了家庭暴力。\n	</p>\n</div>', '3月1日，我国第一部《反家庭暴力法》正式实施，意味着家庭暴力属于“家务事”的时代正式终结。除了大家都清楚的，家庭成员之间的侵害行为，属于家庭暴力。反家暴法还适用于具有共同生活关系的成员，也就是说，情侣同居出现殴打、谩骂等行为，也是家庭暴力。', '10', '0', '0', '1', '1', '网易新闻', '家暴 反家庭暴力法', 'http://www.baidu.com', '0', '0', '1457779085');
INSERT INTO `pz_article` VALUES ('4', '丈夫将老婆名写篮球上 一生气就打被判定家暴4', '/upload/2016/03/12/_3sw2_2acltjopcrqv5brhmhxlzst7wl.jpg', '<div class=\"otitle\" style=\"padding:0px;margin:20px 0px 0px;font-size:14px;color:#252525;font-family:宋体, sans-serif;background-color:#FFFFFF;\">\n	（原标题：他把老婆名字写在篮球上 拍球时不停地说“打死你”）\n</div>\n<div id=\"endText\" class=\"end-text\" style=\"padding:0px 0px 20px;margin:0px 10px 0px 0px;text-align:justify;font-size:16px;color:#252525;font-family:宋体, sans-serif;background-color:#FFFFFF;\">\n	<p style=\"text-indent:2em;\">\n		3月1日，我国第一部《反家庭暴力法》正式实施，意味着家庭暴力属于“家务事”的时代正式终结。除了大家都清楚的，家庭成员之间的侵害行为，属于家庭暴力。反家暴法还适用于具有共同生活关系的成员，也就是说，情侣同居出现殴打、谩骂等行为，也是家庭暴力。\n	</p>\n	<p style=\"text-indent:2em;\">\n		3月10日上午，是反家暴法生效的第十天，区妇联联合区委政法委、区司法局、区公安局，开展了《反家庭暴力法》业务知识培训。参加会议的有全区妇女代表以及司法局、公安局等相关科室人员，共计200余人参加。\n	</p>\n	<p style=\"text-indent:2em;\">\n		培训会邀请了重庆市经管学院心理学教授、全国公安系统优秀教师郭子贤教授。会上，郭教授用简洁易懂的方式，给大家诠释了反家庭暴力的相关条款。“不孝子女殴打父母，或者妻子殴打丈夫，这些也是家庭暴力。”郭教授说，只要是发生在家庭成员之间的侵害行为，都属于家庭暴力。\n	</p>\n	<p style=\"text-indent:2em;\">\n		“同居之间的恋人，一方殴打另一方，也是家庭暴力。”郭教授介绍，如今只要是具有共同生活关系，比如同居、扶养、寄养等，他们之间出现的殴打、谩骂，都能算作家庭暴力。\n	</p>\n	<p style=\"text-indent:2em;\">\n		而人们很少意识到的恐吓，也是家庭暴力的一种。郭教授说，在他接触过的案例中，曾有一个丈夫，因为对妻子不满。便在家中放置了很多篮球，篮球上写上妻子的名字。每天闲来无事，他便拍打篮球，同时口中念念有词“×××，打死你！”等等。\n	</p>\n	<p style=\"text-indent:2em;\">\n		时间一长，妻子的精神受到了极大的伤害，以至于她一听到“篮球”二字就会浑身发抖，要是听到打篮球的声音，就会抱头躲开。最后，经过调查，判定丈夫的这种行为已经构成了家庭暴力。\n	</p>\n</div>', '3月1日，我国第一部《反家庭暴力法》正式实施，意味着家庭暴力属于“家务事”的时代正式终结。除了大家都清楚的，家庭成员之间的侵害行为，属于家庭暴力。反家暴法还适用于具有共同生活关系的成员，也就是说，情侣同居出现殴打、谩骂等行为，也是家庭暴力。', '7', '0', '0', '1', '1', '网易新闻', '家暴 反家庭暴力法', 'http://www.baidu.com', '0', '0', '1457779085');

-- ----------------------------
-- Table structure for pz_block
-- ----------------------------
DROP TABLE IF EXISTS `pz_block`;
CREATE TABLE `pz_block` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(100) NOT NULL DEFAULT '',
  `content` varchar(10000) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=106 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pz_block
-- ----------------------------
INSERT INTO `pz_block` VALUES ('2', 'title', 'content');
INSERT INTO `pz_block` VALUES ('8', 'title', 'content');
INSERT INTO `pz_block` VALUES ('3', 'title', 'content');
INSERT INTO `pz_block` VALUES ('4', 'title', 'content');
INSERT INTO `pz_block` VALUES ('5', 'title', 'content');
INSERT INTO `pz_block` VALUES ('6', 'title', 'content');
INSERT INTO `pz_block` VALUES ('7', 'title', 'content');
INSERT INTO `pz_block` VALUES ('48', 'title', 'content');
INSERT INTO `pz_block` VALUES ('47', 'title', 'content');
INSERT INTO `pz_block` VALUES ('49', 'title', 'content');
INSERT INTO `pz_block` VALUES ('50', 'title', 'content');
INSERT INTO `pz_block` VALUES ('51', 'title', 'content');
INSERT INTO `pz_block` VALUES ('52', 'title', 'content');
INSERT INTO `pz_block` VALUES ('53', 'title', 'content');
INSERT INTO `pz_block` VALUES ('54', 'title', 'content');
INSERT INTO `pz_block` VALUES ('55', 'title', 'content');
INSERT INTO `pz_block` VALUES ('56', 'title', 'content');
INSERT INTO `pz_block` VALUES ('57', 'title', 'content');

-- ----------------------------
-- Table structure for pz_cart
-- ----------------------------
DROP TABLE IF EXISTS `pz_cart`;
CREATE TABLE `pz_cart` (
  `rec_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `goods_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `goods_sn` varchar(60) NOT NULL DEFAULT '',
  `goods_name` varchar(120) NOT NULL DEFAULT '',
  `market_price` decimal(10,2) unsigned NOT NULL DEFAULT '0.00',
  `goods_price` decimal(10,2) NOT NULL DEFAULT '0.00',
  `goods_number` smallint(5) unsigned NOT NULL DEFAULT '0',
  `goods_attr` text NOT NULL,
  `is_real` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `extension_code` varchar(30) NOT NULL DEFAULT '' COMMENT '商品的扩展属性',
  `parent_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `rec_type` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '购物车商品类型，0，普通；1，团够；2，拍卖；3，夺宝奇兵'',',
  `is_gift` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '是否是赠品，0，否；其他',
  `is_shipping` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否运输',
  `can_handsel` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `goods_attr_id` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`rec_id`)
) ENGINE=MyISAM AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pz_cart
-- ----------------------------
INSERT INTO `pz_cart` VALUES ('4', '3', '13', '', '', '0.00', '0.00', '8', '', '0', '', '0', '0', '0', '0', '0', '');
INSERT INTO `pz_cart` VALUES ('5', '3', '15', '', '', '0.00', '0.00', '2', '', '0', '', '0', '0', '0', '0', '0', '');

-- ----------------------------
-- Table structure for pz_comment
-- ----------------------------
DROP TABLE IF EXISTS `pz_comment`;
CREATE TABLE `pz_comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `articleid` int(11) DEFAULT '0' COMMENT '文章id',
  `addtime` int(11) DEFAULT '0' COMMENT '添加时间',
  `content` varchar(1000) DEFAULT '' COMMENT '评论内容',
  `uid` int(11) DEFAULT '0' COMMENT '用户id',
  `username` varchar(30) DEFAULT '' COMMENT '用户昵称',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=254 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pz_comment
-- ----------------------------
INSERT INTO `pz_comment` VALUES ('17', '2', '1', 'content17', '1', 'username');
INSERT INTO `pz_comment` VALUES ('18', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('19', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('20', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('21', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('22', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('23', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('24', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('25', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('26', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('27', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('28', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('29', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('30', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('31', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('32', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('33', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('34', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('35', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('36', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('37', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('38', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('39', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('40', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('41', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('42', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('43', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('44', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('45', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('46', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('47', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('48', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('49', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('50', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('51', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('52', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('53', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('54', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('55', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('56', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('57', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('58', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('59', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('60', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('61', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('62', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('63', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('64', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('65', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('66', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('67', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('68', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('69', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('70', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('71', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('72', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('73', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('74', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('75', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('76', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('77', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('78', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('79', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('80', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('81', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('82', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('83', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('84', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('85', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('86', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('87', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('88', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('89', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('90', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('91', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('92', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('93', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('94', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('95', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('96', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('97', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('98', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('99', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('100', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('101', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('102', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('103', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('104', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('105', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('106', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('107', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('108', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('109', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('110', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('111', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('112', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('113', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('114', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('115', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('116', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('117', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('118', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('119', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('120', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('121', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('122', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('123', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('124', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('125', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('126', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('127', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('128', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('129', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('130', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('131', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('132', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('133', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('134', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('135', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('136', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('137', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('138', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('139', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('140', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('141', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('142', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('143', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('144', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('145', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('146', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('147', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('148', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('149', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('150', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('151', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('152', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('153', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('154', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('155', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('156', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('157', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('158', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('159', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('160', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('161', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('162', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('163', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('164', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('165', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('166', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('167', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('168', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('169', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('170', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('171', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('172', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('173', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('174', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('175', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('176', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('177', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('178', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('179', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('180', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('181', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('182', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('183', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('184', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('185', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('186', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('187', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('188', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('189', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('190', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('191', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('192', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('193', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('194', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('195', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('196', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('197', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('198', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('199', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('200', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('201', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('202', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('203', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('204', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('205', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('206', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('207', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('208', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('209', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('210', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('211', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('212', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('213', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('214', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('215', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('216', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('217', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('218', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('219', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('220', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('221', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('222', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('223', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('224', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('225', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('226', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('227', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('228', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('229', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('230', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('231', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('232', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('233', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('234', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('235', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('236', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('237', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('238', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('239', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('240', '2', '1', 'content', '1', 'username');
INSERT INTO `pz_comment` VALUES ('241', '2', '1', 'content', '1', 'username');

-- ----------------------------
-- Table structure for pz_goods
-- ----------------------------
DROP TABLE IF EXISTS `pz_goods`;
CREATE TABLE `pz_goods` (
  `goods_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `cat_id` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '商品所属商品分类id',
  `goods_sn` varchar(60) NOT NULL DEFAULT '' COMMENT '商品的唯一货号',
  `goods_name` varchar(120) NOT NULL DEFAULT '' COMMENT '商品的名称',
  `goods_name_style` varchar(60) NOT NULL DEFAULT '+' COMMENT '商品名称显示的样式；包括颜色和字体样式；格式如#ff00ff+strong',
  `click_count` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '商品点击数',
  `brand_id` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '品牌id',
  `provider_name` varchar(100) NOT NULL DEFAULT '' COMMENT '供货人的名称，程序还没实现该功能',
  `goods_number` mediumint(8) unsigned NOT NULL DEFAULT '0' COMMENT '商品库存数量',
  `goods_weight` decimal(10,3) unsigned NOT NULL DEFAULT '0.000' COMMENT '商品的重量，以千克为单位',
  `market_price` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '市场售价',
  `virtual_sales` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '虚拟销量',
  `shop_price` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '本店售价',
  `promote_price` decimal(10,2) unsigned NOT NULL DEFAULT '0.00' COMMENT '促销价格',
  `promote_start_date` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '促销价格开始日期',
  `promote_end_date` int(11) unsigned NOT NULL DEFAULT '0' COMMENT '促销价格结束日期',
  `warn_number` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '商品报警数量',
  `keywords` varchar(255) NOT NULL DEFAULT '',
  `goods_brief` varchar(255) NOT NULL DEFAULT '',
  `goods_desc` text NOT NULL COMMENT '商品的详细描述',
  `goods_thumb` varchar(255) NOT NULL DEFAULT '' COMMENT '商品在前台显示的微缩图片，如在分类筛选时显示的小图片',
  `goods_img` varchar(255) NOT NULL DEFAULT '' COMMENT '商品的实际大小图片，如进入该商品页时介绍商品属性所显示的大图片',
  `original_img` varchar(255) NOT NULL DEFAULT '' COMMENT '上传的商品的原始图片',
  `is_real` tinyint(3) unsigned NOT NULL DEFAULT '1' COMMENT '是否是实物，1，是；0，否；比如虚拟卡就为0，不是实物',
  `extension_code` varchar(30) NOT NULL DEFAULT '' COMMENT '商品的扩展属性，比如像虚拟卡',
  `is_on_sale` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '该商品是否开放销售，1，是；0，否',
  `is_alone_sale` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否能单独销售，1，是；0，否；如果不能单独销售，则只能作为某商品的配件或者赠品销售',
  `is_shipping` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT '是否免运费,0正常，1免费',
  `integral` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '购买该商品可以使用的积分数量，程序没有实现该功能',
  `add_time` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '商品的添加时间',
  `sort_order` smallint(4) unsigned NOT NULL DEFAULT '0' COMMENT '应该是商品的显示顺序，不过该版程序中没实现该功能',
  `is_delete` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '商品是否已经删除，0，否；1，已删除',
  `is_best` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否是精品；0，否；1，是',
  `is_new` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否是新品',
  `is_hot` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否热销，0，否；1，是',
  `weight_unit` varchar(10) DEFAULT '' COMMENT '重量单位',
  `is_promote` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '是否特价促销；0，否；1，是',
  `bonus_type_id` tinyint(3) unsigned NOT NULL DEFAULT '0' COMMENT '购买该商品所能领到的红包类型',
  `last_update` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '最近一次更新商品配置的时间',
  `goods_type` smallint(5) unsigned NOT NULL DEFAULT '0' COMMENT '商品所属类型id，取值表goods_type的cat_id',
  `seller_note` varchar(255) NOT NULL DEFAULT '' COMMENT '商品的商家备注，仅商家可见',
  `give_integral` int(11) NOT NULL DEFAULT '-1' COMMENT '购买该商品时每笔成功交易赠送的积分数量',
  `rank_integral` int(11) NOT NULL DEFAULT '-1' COMMENT '送等级积分数',
  `suppliers_id` smallint(5) unsigned DEFAULT '0' COMMENT '供货商id',
  `is_check` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '供货商商品审核标识',
  PRIMARY KEY (`goods_id`),
  KEY `goods_sn` (`goods_sn`),
  KEY `cat_id` (`cat_id`),
  KEY `last_update` (`last_update`),
  KEY `brand_id` (`brand_id`),
  KEY `goods_weight` (`goods_weight`),
  KEY `promote_end_date` (`promote_end_date`),
  KEY `promote_start_date` (`promote_start_date`),
  KEY `goods_number` (`goods_number`),
  KEY `sort_order` (`sort_order`)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pz_goods
-- ----------------------------
INSERT INTO `pz_goods` VALUES ('1', '1', '', '阿萨德', '+', '0', '11', '', '0', '0.000', '150.00', '0', '100.00', '0.00', '0', '0', '1', '', '', '', '', '', '', '1', '', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '', '0', '0', '0', '0', '', '-1', '-1', '0', '0');
INSERT INTO `pz_goods` VALUES ('2', '1', 'Z6t19_wBQ9UXQAqhTV7NF5dRQTHjU8Mj', '阿萨德1', '+', '0', '11', '', '0', '0.000', '0.00', '0', '0.00', '0.00', '0', '0', '1', '', '', '', '', '', '', '1', '', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '', '0', '0', '0', '0', '', '-1', '-1', '0', '0');
INSERT INTO `pz_goods` VALUES ('3', '1', 'i71cXS39Rh', '阿萨德1', '+', '0', '11', '', '0', '0.000', '0.00', '0', '0.00', '0.00', '0', '0', '1', '', '', '', '', '', '', '1', '', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '', '0', '0', '0', '0', '', '-1', '-1', '0', '0');
INSERT INTO `pz_goods` VALUES ('4', '1', 'pcjemyxzmfdfy', '阿萨德1', '+', '0', '11', '', '0', '0.000', '0.00', '0', '0.00', '0.00', '0', '0', '1', '', '', '', '', '', '', '1', '', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '', '0', '0', '0', '0', '', '-1', '-1', '0', '0');
INSERT INTO `pz_goods` VALUES ('5', '1', 'JITJUMWAGKUOG', 'asd ', '+', '0', '11', '', '0', '0.000', '0.00', '0', '0.00', '0.00', '0', '0', '1', '', '', '', '', '', '', '1', '', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '', '0', '0', '0', '0', '', '-1', '-1', '0', '0');
INSERT INTO `pz_goods` VALUES ('6', '1', 'JITJUMWAGKUOG', 'asd ', '+', '0', '11', '', '0', '0.000', '0.00', '0', '0.00', '0.00', '0', '0', '1', '', '', '', '', '', '', '1', '', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '', '0', '0', '0', '0', '', '-1', '-1', '0', '0');
INSERT INTO `pz_goods` VALUES ('7', '1', 'TBSJKWGUD6C_N', 'asd ', '+', '0', '11', '', '0', '0.000', '0.00', '0', '0.00', '0.00', '0', '0', '1', '', '', '', '', '', '', '1', '', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '', '0', '0', '0', '0', '', '-1', '-1', '0', '0');
INSERT INTO `pz_goods` VALUES ('8', '1', 'ASU1465280386000', 'asd ', '+', '0', '11', '', '0', '0.000', '0.00', '0', '0.00', '0.00', '0', '0', '1', '', '', '', '', '', '', '1', '', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '', '0', '0', '0', '0', '', '-1', '-1', '0', '0');
INSERT INTO `pz_goods` VALUES ('9', '1', 'ASU1465280494', 'asd ', '+', '0', '11', '', '0', '0.000', '0.00', '0', '0.00', '0.00', '0', '0', '1', '', '', '', '', '', '', '1', '', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '', '0', '0', '0', '0', '', '-1', '-1', '0', '0');
INSERT INTO `pz_goods` VALUES ('10', '1', 'ASU1465280646', '阿斯达岁的', '+', '0', '11', '', '0', '0.000', '0.00', '0', '0.00', '0.00', '0', '0', '1', '', '', '', '', '', '', '1', '', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '', '0', '0', '0', '0', '', '-1', '-1', '0', '0');
INSERT INTO `pz_goods` VALUES ('11', '1', 'ASU1465280661', '阿斯达岁的阿萨德', '+', '0', '11', '', '0', '0.000', '0.00', '0', '0.00', '0.00', '0', '0', '1', '', '', '', '', '', '', '1', '', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '', '0', '0', '0', '0', '', '-1', '-1', '0', '0');
INSERT INTO `pz_goods` VALUES ('12', '1', 'ASU1465280682', '阿斯达岁的阿萨德', '+', '0', '11', '', '0', '0.000', '0.00', '0', '0.00', '0.00', '0', '0', '1', '', '', '', '', '', '', '1', '', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '', '0', '0', '0', '0', '', '-1', '-1', '0', '0');
INSERT INTO `pz_goods` VALUES ('13', '14', 'ASU1465280932', '爱冕－白18K金钻石戒指', '+', '0', '11', '', '101', '1.000', '150.00', '0', '100.00', '0.00', '0', '0', '1', '关键字3 关键字2 关键字1', '国庆大促，下单再减百分之十', '<p>\n	<br />\n</p>\n<table width=\"900\" border=\"0\">\n	<tbody>\n		<tr>\n			<td>\n				<img src=\"http://imu.zbird.cn/261/88/26188_1\" width=\"900\" height=\"636\" alt />\n			</td>\n		</tr>\n		<tr>\n			<td>\n				<img src=\"http://imu.zbird.cn/261/88/26188_4\" width=\"900\" height=\"592\" alt />\n			</td>\n		</tr>\n		<tr>\n			<td>\n				<img src=\"http://imp.zbird.cn/261/89/26189_1\" width=\"900\" height=\"1336\" alt />\n			</td>\n		</tr>\n		<tr>\n			<td>\n				<img src=\"http://imp.zbird.cn/261/89/26189_4\" width=\"900\" height=\"838\" alt />\n			</td>\n		</tr>\n		<tr>\n			<td>\n				<img src=\"http://imu.zbird.cn/261/92/26192_1\" width=\"900\" height=\"694\" alt />\n			</td>\n		</tr>\n		<tr>\n			<td>\n				<img src=\"http://imu.zbird.cn/261/92/26192_4\" width=\"900\" height=\"810\" alt />\n			</td>\n		</tr>\n		<tr>\n			<td>\n				<img src=\"http://imp.zbird.cn/261/93/26193_1\" width=\"900\" height=\"1372\" alt />\n			</td>\n		</tr>\n		<tr>\n			<td>\n				<img src=\"http://imp.zbird.cn/261/93/26193_4\" width=\"900\" height=\"1122\" alt />\n			</td>\n		</tr>\n	</tbody>\n</table>', '', '/2016/06/15/v0rajwenn_0xg19ozwbawfspb5ttekhp.jpg', '', '1', '', '1', '1', '0', '0', '0', '0', '0', '1', '1', '1', '1', '0', '0', '0', '5', '商家备注', '-1', '-1', '0', '0');
INSERT INTO `pz_goods` VALUES ('14', '13', 'ASU1465280932', 'asd asd', '+', '0', '11', '', '0', '0.000', '0.00', '0', '0.00', '0.00', '0', '0', '1', '', '', '', '', '', '', '1', '', '1', '1', '0', '0', '0', '0', '0', '0', '0', '0', '', '0', '0', '0', '0', '', '-1', '-1', '0', '0');
INSERT INTO `pz_goods` VALUES ('15', '14', 'ASU1465280932', '爱冕－黑18K金钻石戒指', '+', '0', '11', '', '101', '1.000', '150.00', '0', '100.00', '0.00', '0', '0', '1', '关键字3 关键字2 关键字1', '国庆大促，下单再减百分之十', '<p>\n	<br />\n</p>\n<table width=\"900\" border=\"0\">\n	<tbody>\n		<tr>\n			<td>\n				<img src=\"http://imu.zbird.cn/261/88/26188_1\" width=\"900\" height=\"636\" alt />\n			</td>\n		</tr>\n		<tr>\n			<td>\n				<img src=\"http://imu.zbird.cn/261/88/26188_4\" width=\"900\" height=\"592\" alt />\n			</td>\n		</tr>\n		<tr>\n			<td>\n				<img src=\"http://imp.zbird.cn/261/89/26189_1\" width=\"900\" height=\"1336\" alt />\n			</td>\n		</tr>\n		<tr>\n			<td>\n				<img src=\"http://imp.zbird.cn/261/89/26189_4\" width=\"900\" height=\"838\" alt />\n			</td>\n		</tr>\n		<tr>\n			<td>\n				<img src=\"http://imu.zbird.cn/261/92/26192_1\" width=\"900\" height=\"694\" alt />\n			</td>\n		</tr>\n		<tr>\n			<td>\n				<img src=\"http://imu.zbird.cn/261/92/26192_4\" width=\"900\" height=\"810\" alt />\n			</td>\n		</tr>\n		<tr>\n			<td>\n				<img src=\"http://imp.zbird.cn/261/93/26193_1\" width=\"900\" height=\"1372\" alt />\n			</td>\n		</tr>\n		<tr>\n			<td>\n				<img src=\"http://imp.zbird.cn/261/93/26193_4\" width=\"900\" height=\"1122\" alt />\n			</td>\n		</tr>\n	</tbody>\n</table>', '', '/2016/06/15/v0rajwenn_0xg19ozwbawfspb5ttekhp.jpg', '', '1', '', '1', '1', '0', '0', '0', '0', '0', '1', '1', '1', '1', '0', '0', '0', '5', '商家备注', '-1', '-1', '0', '0');

-- ----------------------------
-- Table structure for pz_goods_attr
-- ----------------------------
DROP TABLE IF EXISTS `pz_goods_attr`;
CREATE TABLE `pz_goods_attr` (
  `goods_attr_id` int(11) NOT NULL AUTO_INCREMENT,
  `goodsid` int(11) DEFAULT '0' COMMENT '商品编号',
  `attrid` smallint(5) DEFAULT '0' COMMENT '属性编号',
  `attrvalue` text COMMENT '属性值',
  `attrprice` int(4) DEFAULT '0' COMMENT '属性价格',
  PRIMARY KEY (`goods_attr_id`)
) ENGINE=MyISAM AUTO_INCREMENT=62 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pz_goods_attr
-- ----------------------------
INSERT INTO `pz_goods_attr` VALUES ('44', '13', '4', '商品别名', '0');
INSERT INTO `pz_goods_attr` VALUES ('43', '13', '3', '英文片名', '0');
INSERT INTO `pz_goods_attr` VALUES ('42', '13', '2', '中文片名', '0');
INSERT INTO `pz_goods_attr` VALUES ('45', '13', '5', 'DTS', '0');
INSERT INTO `pz_goods_attr` VALUES ('46', '13', '6', '片装数', '0');
INSERT INTO `pz_goods_attr` VALUES ('47', '13', '7', '中国', '0');
INSERT INTO `pz_goods_attr` VALUES ('48', '13', '8', '中文', '0');
INSERT INTO `pz_goods_attr` VALUES ('49', '13', '9', '导演', '0');
INSERT INTO `pz_goods_attr` VALUES ('50', '13', '10', '主唱', '0');
INSERT INTO `pz_goods_attr` VALUES ('51', '13', '11', '流行', '0');
INSERT INTO `pz_goods_attr` VALUES ('52', '13', '12', '10m', '0');
INSERT INTO `pz_goods_attr` VALUES ('53', '13', '13', '有', '0');
INSERT INTO `pz_goods_attr` VALUES ('54', '13', '14', 'SD5456', '0');
INSERT INTO `pz_goods_attr` VALUES ('55', '13', '15', 'WD458', '0');
INSERT INTO `pz_goods_attr` VALUES ('56', '13', '16', '发行公司', '0');
INSERT INTO `pz_goods_attr` VALUES ('57', '13', '17', 'test', '0');
INSERT INTO `pz_goods_attr` VALUES ('58', '13', '18', 'U盘1', '10');
INSERT INTO `pz_goods_attr` VALUES ('59', '13', '18', 'U盘2', '20');
INSERT INTO `pz_goods_attr` VALUES ('60', '13', '18', 'U盘3', '30');
INSERT INTO `pz_goods_attr` VALUES ('61', '13', '18', 'U盘4', '40');

-- ----------------------------
-- Table structure for pz_goods_gallery
-- ----------------------------
DROP TABLE IF EXISTS `pz_goods_gallery`;
CREATE TABLE `pz_goods_gallery` (
  `img_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `goods_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `img_url` varchar(255) NOT NULL DEFAULT '' COMMENT '实际图片url',
  `img_desc` varchar(255) NOT NULL DEFAULT '' COMMENT '图片描述',
  `thumb_url` varchar(255) NOT NULL DEFAULT '' COMMENT '缩略图地址',
  `img_original` varchar(255) NOT NULL DEFAULT '' COMMENT '原始图片地址',
  PRIMARY KEY (`img_id`),
  KEY `goods_id` (`goods_id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pz_goods_gallery
-- ----------------------------
INSERT INTO `pz_goods_gallery` VALUES ('1', '13', '/2016/06/15/v0rajwenn_0xg19ozwbawfspb5ttekhp.jpg', '', '', '');
INSERT INTO `pz_goods_gallery` VALUES ('2', '13', '/2016/06/15/v0rajwenn_0xg19ozwbawfspb5ttekhp.jpg', '', '', '');
INSERT INTO `pz_goods_gallery` VALUES ('3', '13', '/2016/06/15/v0rajwenn_0xg19ozwbawfspb5ttekhp.jpg', '', '', '');
INSERT INTO `pz_goods_gallery` VALUES ('4', '13', '/2016/06/15/v0rajwenn_0xg19ozwbawfspb5ttekhp.jpg', '', '', '');
INSERT INTO `pz_goods_gallery` VALUES ('5', '13', '/2016/06/15/v0rajwenn_0xg19ozwbawfspb5ttekhp.jpg', '', '', '');

-- ----------------------------
-- Table structure for pz_goods_node
-- ----------------------------
DROP TABLE IF EXISTS `pz_goods_node`;
CREATE TABLE `pz_goods_node` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT '0',
  `name` varchar(50) DEFAULT '',
  `brief` varchar(255) DEFAULT '',
  `nodepath` varchar(255) DEFAULT '',
  `link` varchar(100) DEFAULT '',
  `weight` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pz_goods_node
-- ----------------------------
INSERT INTO `pz_goods_node` VALUES ('1', '0', '首页', '', ',1,', '', '0');
INSERT INTO `pz_goods_node` VALUES ('3', '1', '家用家电', '国际豆腐干豆腐干', ',1,3,', '', '0');
INSERT INTO `pz_goods_node` VALUES ('4', '1', '手机、数码', '', ',1,4,', '', '0');
INSERT INTO `pz_goods_node` VALUES ('5', '1', '图片', '', ',1,5,', '', '0');
INSERT INTO `pz_goods_node` VALUES ('6', '1', '国内', '', ',1,6,', '', '0');
INSERT INTO `pz_goods_node` VALUES ('7', '1', '社会', '', ',1,7,', '', '0');
INSERT INTO `pz_goods_node` VALUES ('8', '1', '聚合', '网易聚合阅读', ',1,8,', '', '1');
INSERT INTO `pz_goods_node` VALUES ('9', '3', '大家电', '测试1测试', ',1,3,9,', '', '0');
INSERT INTO `pz_goods_node` VALUES ('10', '1', '数读', '阿萨德', ',1,10,', '', '0');
INSERT INTO `pz_goods_node` VALUES ('11', '8', '聚合军事', '', ',1,8,11,', '', '0');
INSERT INTO `pz_goods_node` VALUES ('12', '11', '两会观点', '', ',1,8,11,12,', '', '0');
INSERT INTO `pz_goods_node` VALUES ('13', '9', '平板电视', '', ',1,3,9,13,', '', '0');
INSERT INTO `pz_goods_node` VALUES ('14', '9', '空调', '', ',1,3,9,14,', '', '0');
INSERT INTO `pz_goods_node` VALUES ('15', '9', '冰箱', '', ',1,3,9,15,', '', '0');
INSERT INTO `pz_goods_node` VALUES ('16', '9', '洗衣机', '', ',1,3,9,16,', '', '0');
INSERT INTO `pz_goods_node` VALUES ('17', '9', '家庭影院', '', ',1,3,9,17,', '', '0');
INSERT INTO `pz_goods_node` VALUES ('18', '3', '生活电器', '', ',1,3,18,', '', '0');
INSERT INTO `pz_goods_node` VALUES ('19', '18', '电风扇', '', ',1,3,18,19,', '', '0');
INSERT INTO `pz_goods_node` VALUES ('20', '18', '冷风扇', '', ',1,3,18,20,', '', '0');

-- ----------------------------
-- Table structure for pz_goods_type_attr
-- ----------------------------
DROP TABLE IF EXISTS `pz_goods_type_attr`;
CREATE TABLE `pz_goods_type_attr` (
  `attrid` int(11) NOT NULL AUTO_INCREMENT,
  `catid` smallint(5) DEFAULT '0' COMMENT '商品类型编号',
  `attrname` varchar(60) DEFAULT '' COMMENT '属性名称',
  `inputtype` tinyint(1) DEFAULT '0' COMMENT '属性输入方式，0为单行文本框   1为下拉框，2为多行文本',
  `attrtype` tinyint(1) DEFAULT '1' COMMENT '0为属性，1为规格',
  `attrvalue` text COMMENT '属性可选值',
  `weight` tinyint(3) DEFAULT NULL,
  PRIMARY KEY (`attrid`)
) ENGINE=MyISAM AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COMMENT='此表用来维护商品的属性信息';

-- ----------------------------
-- Records of pz_goods_type_attr
-- ----------------------------
INSERT INTO `pz_goods_type_attr` VALUES ('3', '5', '英文片名', '0', '0', '', '0');
INSERT INTO `pz_goods_type_attr` VALUES ('10', '5', '主唱', '0', '0', '', '0');
INSERT INTO `pz_goods_type_attr` VALUES ('2', '5', '中文片名', '0', '0', 'ddasdasd\n不知道\nasdasd\nasdasd\nasdasd\nasdasd', '0');
INSERT INTO `pz_goods_type_attr` VALUES ('11', '5', '所属类别', '1', '0', '古典\n流行\n摇滚\n乡村\n民谣\n爵士\n蓝调\n电子\n舞曲 \n国乐\n民族\n怀旧\n经典\n人声\n合唱\n发烧\n试音\n儿童\n胎教\n轻音乐\n世界音乐\n庆典音乐\n影视音乐\n新世纪音乐\n大自然音乐', '0');
INSERT INTO `pz_goods_type_attr` VALUES ('4', '5', '商品别名', '0', '0', '', '0');
INSERT INTO `pz_goods_type_attr` VALUES ('5', '5', '介质/格式', '1', '0', 'HDCD\nDTS\nDVD\nDVD9\nVCD\nCD\nTAPE\nLP', '0');
INSERT INTO `pz_goods_type_attr` VALUES ('6', '5', '片装数', '0', '0', '', '0');
INSERT INTO `pz_goods_type_attr` VALUES ('7', '5', '国家地区', '0', '0', '', '0');
INSERT INTO `pz_goods_type_attr` VALUES ('8', '5', '语种', '1', '0', '中文\n英文\n法文\n西班牙文', '0');
INSERT INTO `pz_goods_type_attr` VALUES ('9', '5', '导演/指挥', '0', '0', '', '0');
INSERT INTO `pz_goods_type_attr` VALUES ('12', '5', '长度', '0', '0', '', '0');
INSERT INTO `pz_goods_type_attr` VALUES ('13', '5', '歌词', '1', '0', '有\n无', '0');
INSERT INTO `pz_goods_type_attr` VALUES ('14', '5', '碟片代码', '0', '0', '', '0');
INSERT INTO `pz_goods_type_attr` VALUES ('15', '5', 'ISRC码', '0', '0', '', '0');
INSERT INTO `pz_goods_type_attr` VALUES ('16', '5', '发行公司', '0', '0', '', '0');
INSERT INTO `pz_goods_type_attr` VALUES ('17', '5', 'test', '0', '0', '', '0');
INSERT INTO `pz_goods_type_attr` VALUES ('18', '5', '邮寄方式', '1', '1', 'U盘1\nU盘2\nU盘3\nU盘4', '0');

-- ----------------------------
-- Table structure for pz_goods-del
-- ----------------------------
DROP TABLE IF EXISTS `pz_goods-del`;
CREATE TABLE `pz_goods-del` (
  `goodsid` int(11) NOT NULL AUTO_INCREMENT,
  `catid` smallint(5) DEFAULT '0' COMMENT '商品分类id',
  `goodsn` varchar(60) DEFAULT '' COMMENT '商品货号',
  `name` varchar(120) DEFAULT '' COMMENT '商品名称',
  `nameStyle` varchar(60) DEFAULT '' COMMENT '商品名称显示样式',
  `clickCount` int(10) DEFAULT '0' COMMENT '浏览次数',
  `pinpaiId` smallint(5) DEFAULT '0' COMMENT '品牌ID',
  `providerName` varchar(100) DEFAULT '' COMMENT '供货商名称，程序还没实现该功能',
  `goodsNumber` smallint(5) DEFAULT '0' COMMENT '库存数量',
  `goodWeight` decimal(10,3) DEFAULT '0.000' COMMENT '商品重量,默认单位克',
  `marketPrice` decimal(10,2) DEFAULT '0.00' COMMENT '市场价格',
  `shopPrice` decimal(10,2) DEFAULT '0.00' COMMENT '本店售价',
  `promotePrice` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '促销价格，如果有促销价格，则按照促销价格销售，此价格不再参与会员的折扣计算。',
  `promoteStart` int(11) NOT NULL DEFAULT '0' COMMENT '促销开始日期',
  `promoteEnd` int(11) NOT NULL DEFAULT '0' COMMENT '促销结束日期',
  `warnNumer` tinyint(3) NOT NULL DEFAULT '1' COMMENT '库存警告数量',
  `keywords` varchar(255) NOT NULL DEFAULT '',
  `brief` varchar(255) NOT NULL DEFAULT '',
  `goodDesc` text NOT NULL COMMENT '详细描述',
  `thumb` varchar(255) NOT NULL DEFAULT '' COMMENT '前台显示的微缩图片，如在分类筛选时显示的小图片',
  `goodsImg` varchar(255) NOT NULL DEFAULT '' COMMENT '商品的实际大小图片，如进入该商品页时介绍商品属性所显示的大图片',
  `original_img` varchar(255) NOT NULL DEFAULT '' COMMENT '商品原始图片地址',
  `isReal` tinyint(3) NOT NULL DEFAULT '1' COMMENT '是否实体商品',
  `extensionCode` varchar(30) NOT NULL DEFAULT '' COMMENT '虚拟商品代码',
  `isOnSale` tinyint(1) NOT NULL DEFAULT '1' COMMENT '能否销售(上架、下架)：1，上架；0，下架；',
  `isAloneSale` tinyint(1) NOT NULL DEFAULT '1' COMMENT '能否单独销售',
  `integral` int(10) NOT NULL DEFAULT '0' COMMENT '商品的积分',
  `addTime` int(10) NOT NULL DEFAULT '0' COMMENT '加入时间',
  `sortOrder` smallint(4) NOT NULL DEFAULT '0' COMMENT '排列顺序',
  `isDelete` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否已删除',
  `isBest` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否精品',
  `isNew` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否新品',
  `isHot` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否热销',
  `isPromote` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否特价',
  `bonusTypeId` tinyint(3) NOT NULL DEFAULT '0' COMMENT '红包类型id',
  `suppliersId` smallint(5) NOT NULL DEFAULT '0' COMMENT '供货商id',
  `isCheck` tinyint(1) NOT NULL DEFAULT '0' COMMENT '供货商商品审核标识，0，未审核；1，已审核',
  `lastUpdate` int(10) NOT NULL DEFAULT '0' COMMENT '最后更新时间',
  `goodsType` smallint(5) NOT NULL DEFAULT '0' COMMENT '商品类型ID',
  `sellerNote` varchar(255) NOT NULL DEFAULT '' COMMENT '商家备注',
  `giveIntegral` int(11) NOT NULL DEFAULT '-1' COMMENT '送消费积分数',
  `rankIntegral` int(11) NOT NULL DEFAULT '-1' COMMENT '送等级积分数',
  PRIMARY KEY (`goodsid`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COMMENT='商品数据表';

-- ----------------------------
-- Records of pz_goods-del
-- ----------------------------

-- ----------------------------
-- Table structure for pz_goodstype
-- ----------------------------
DROP TABLE IF EXISTS `pz_goodstype`;
CREATE TABLE `pz_goodstype` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `catname` varchar(60) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pz_goodstype
-- ----------------------------
INSERT INTO `pz_goodstype` VALUES ('4', '书');
INSERT INTO `pz_goodstype` VALUES ('5', '音乐');

-- ----------------------------
-- Table structure for pz_goodtree
-- ----------------------------
DROP TABLE IF EXISTS `pz_goodtree`;
CREATE TABLE `pz_goodtree` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT '0' COMMENT '父节点id',
  `name` varchar(50) DEFAULT '' COMMENT '节点名称',
  `brief` varchar(255) DEFAULT '' COMMENT '描述',
  `nodepath` varchar(255) DEFAULT '',
  `link` varchar(100) DEFAULT '' COMMENT '自定义连接地址',
  `weight` int(11) DEFAULT '0' COMMENT '权重',
  `display` int(255) DEFAULT '0' COMMENT '是否显示',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pz_goodtree
-- ----------------------------
INSERT INTO `pz_goodtree` VALUES ('1', '0', '首页', '', ',1,', '', '0', '0');
INSERT INTO `pz_goodtree` VALUES ('3', '1', '国际', '国际豆腐干豆腐干', ',1,3,', '', '0', '0');
INSERT INTO `pz_goodtree` VALUES ('4', '1', '排行', '', ',1,4,', '', '0', '0');
INSERT INTO `pz_goodtree` VALUES ('5', '1', '图片', '', ',1,5,', '', '0', '0');
INSERT INTO `pz_goodtree` VALUES ('6', '1', '国内', '', ',1,6,', '', '0', '0');
INSERT INTO `pz_goodtree` VALUES ('7', '1', '社会', '', ',1,7,', '', '0', '0');
INSERT INTO `pz_goodtree` VALUES ('8', '1', '聚合', '网易聚合阅读', ',1,8,', '', '1', '0');
INSERT INTO `pz_goodtree` VALUES ('9', '3', '国际评论', '测试1测试', ',1,3,9,', '', '0', '0');
INSERT INTO `pz_goodtree` VALUES ('10', '1', '数读', '', ',1,10,', '', '0', '0');
INSERT INTO `pz_goodtree` VALUES ('11', '8', '聚合军事', '', ',1,8,11,', '', '0', '0');
INSERT INTO `pz_goodtree` VALUES ('12', '11', '两会观点', '', ',1,8,11,12,', '', '0', '0');

-- ----------------------------
-- Table structure for pz_node
-- ----------------------------
DROP TABLE IF EXISTS `pz_node`;
CREATE TABLE `pz_node` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pid` int(11) DEFAULT '0',
  `name` varchar(50) DEFAULT '',
  `brief` varchar(255) DEFAULT '',
  `nodepath` varchar(255) DEFAULT '',
  `link` varchar(100) DEFAULT '',
  `weight` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pz_node
-- ----------------------------
INSERT INTO `pz_node` VALUES ('1', '0', '首页', '', ',1,', '', '0');
INSERT INTO `pz_node` VALUES ('3', '1', '国际', '国际豆腐干豆腐干', ',1,3,', '', '0');
INSERT INTO `pz_node` VALUES ('4', '1', '排行', '', ',1,4,', '', '0');
INSERT INTO `pz_node` VALUES ('5', '1', '图片', '', ',1,5,', '', '0');
INSERT INTO `pz_node` VALUES ('6', '1', '国内', '', ',1,6,', '', '0');
INSERT INTO `pz_node` VALUES ('7', '1', '社会', '', ',1,7,', '', '0');
INSERT INTO `pz_node` VALUES ('8', '1', '聚合', '网易聚合阅读', ',1,8,', '', '1');
INSERT INTO `pz_node` VALUES ('9', '3', '国际评论', '测试1测试', ',1,3,9,', '', '0');
INSERT INTO `pz_node` VALUES ('10', '1', '数读', '阿萨德', ',1,10,', '', '0');
INSERT INTO `pz_node` VALUES ('11', '8', '聚合军事', '', ',1,8,11,', '', '0');
INSERT INTO `pz_node` VALUES ('12', '11', '两会观点', '', ',1,8,11,12,', '', '0');

-- ----------------------------
-- Table structure for pz_order_action
-- ----------------------------
DROP TABLE IF EXISTS `pz_order_action`;
CREATE TABLE `pz_order_action` (
  `action_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `action_user` varchar(30) NOT NULL DEFAULT '',
  `order_status` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `shipping_status` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `pay_status` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `action_place` tinyint(1) unsigned NOT NULL DEFAULT '0',
  `action_note` varchar(255) NOT NULL DEFAULT '',
  `log_time` int(11) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`action_id`),
  KEY `order_id` (`order_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pz_order_action
-- ----------------------------

-- ----------------------------
-- Table structure for pz_order_goods
-- ----------------------------
DROP TABLE IF EXISTS `pz_order_goods`;
CREATE TABLE `pz_order_goods` (
  `rec_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `order_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `goods_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `goods_name` varchar(120) NOT NULL DEFAULT '',
  `goods_sn` varchar(60) NOT NULL DEFAULT '',
  `product_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `goods_number` smallint(5) unsigned NOT NULL DEFAULT '1',
  `market_price` decimal(10,2) DEFAULT '0.00',
  `goods_price` decimal(10,2) DEFAULT '0.00',
  `discount_fee` decimal(10,2) DEFAULT '0.00' COMMENT '对接erp专用，商品优惠金额',
  `goods_attr` text,
  `send_number` smallint(5) unsigned DEFAULT '0',
  `is_real` tinyint(1) unsigned DEFAULT '0',
  `extension_code` varchar(30) DEFAULT '',
  `parent_id` mediumint(8) unsigned DEFAULT '0',
  `is_gift` smallint(5) unsigned DEFAULT '0',
  `goods_attr_id` varchar(255) DEFAULT '',
  `goods_img` varchar(255) DEFAULT '' COMMENT '商品图片',
  PRIMARY KEY (`rec_id`),
  KEY `order_id` (`order_id`),
  KEY `goods_id` (`goods_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pz_order_goods
-- ----------------------------
INSERT INTO `pz_order_goods` VALUES ('11', '40', '15', '爱冕－黑18K金钻石戒指', 'ASU1465280932', '0', '101', '150.00', '0.00', '0.00', null, '0', '1', '', '0', '0', '', '/2016/06/15/v0rajwenn_0xg19ozwbawfspb5ttekhp.jpg');
INSERT INTO `pz_order_goods` VALUES ('12', '40', '13', '爱冕－白18K金钻石戒指', 'ASU1465280932', '0', '101', '150.00', '0.00', '0.00', null, '0', '1', '', '0', '0', '', '/2016/06/15/v0rajwenn_0xg19ozwbawfspb5ttekhp.jpg');

-- ----------------------------
-- Table structure for pz_order_info
-- ----------------------------
DROP TABLE IF EXISTS `pz_order_info`;
CREATE TABLE `pz_order_info` (
  `order_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `order_sn` varchar(20) NOT NULL DEFAULT '' COMMENT '订单号',
  `user_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `order_status` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '订单状态。0未确认；1已确认；2已取消；3无效；4退货',
  `shipping_status` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '商品配送情况，0未发货；1已发货；2已收货；3备货中',
  `pay_status` tinyint(1) unsigned NOT NULL DEFAULT '0' COMMENT '支付状态；0，未付款；1，付款中；2，已付款',
  `consignee` varchar(60) NOT NULL DEFAULT '',
  `country` varchar(50) NOT NULL DEFAULT '0',
  `province` varchar(50) NOT NULL DEFAULT '0',
  `city` varchar(50) NOT NULL DEFAULT '0',
  `district` varchar(50) NOT NULL DEFAULT '0',
  `address` varchar(255) NOT NULL DEFAULT '',
  `zipcode` varchar(60) NOT NULL DEFAULT '',
  `tel` varchar(60) NOT NULL DEFAULT '',
  `postscript` varchar(255) NOT NULL DEFAULT '' COMMENT '订单留言',
  `shipping_id` tinyint(3) NOT NULL DEFAULT '0' COMMENT '配送方式id',
  `shipping_name` varchar(120) NOT NULL DEFAULT '' COMMENT '用户选择的配送方式的名称，取值表pz_shipping',
  `pay_id` tinyint(3) NOT NULL DEFAULT '0' COMMENT '支付方式的id',
  `pay_name` varchar(120) NOT NULL DEFAULT '',
  `how_oos` varchar(120) NOT NULL DEFAULT '' COMMENT '缺货处理方式，等待所有商品备齐后再发； 取消订单；与店主协商',
  `inv_payee` varchar(120) NOT NULL DEFAULT '' COMMENT '发票抬头',
  `inv_content` varchar(120) NOT NULL DEFAULT '' COMMENT '发票内容',
  `goods_amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '商品总金额',
  `shipping_fee` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '配送费用',
  `insure_fee` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '保价费用',
  `pay_fee` decimal(10,2) NOT NULL DEFAULT '0.00',
  `money_paid` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '已付款金额',
  `surplus` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '该订单使用余额的数量，取用户设定余额，用户可用余额，订单金额中最小者',
  `integral` int(10) unsigned NOT NULL DEFAULT '0' COMMENT '''使用的积分的数量，取用户使用积分，商品可用积分，用户拥有积分中最小者',
  `integral_money` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '使用积分金额',
  `order_amount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '应付款金额',
  `add_time` int(10) unsigned NOT NULL DEFAULT '0',
  `confirm_time` int(10) unsigned NOT NULL DEFAULT '0',
  `pay_time` int(10) unsigned NOT NULL DEFAULT '0',
  `shipping_time` int(10) unsigned NOT NULL DEFAULT '0',
  `invoice_no` varchar(255) NOT NULL DEFAULT '' COMMENT '发货单号',
  `to_buyer` varchar(255) NOT NULL DEFAULT '' COMMENT '商家给客户的留言',
  `pay_note` varchar(255) NOT NULL DEFAULT '' COMMENT '付款备注',
  `tax` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '发票税额',
  `parent_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `discount` decimal(10,2) NOT NULL DEFAULT '0.00' COMMENT '折扣金额',
  PRIMARY KEY (`order_id`),
  UNIQUE KEY `order_sn` (`order_sn`),
  KEY `user_id` (`user_id`),
  KEY `order_status` (`order_status`),
  KEY `shipping_status` (`shipping_status`),
  KEY `pay_status` (`pay_status`),
  KEY `shipping_id` (`shipping_id`),
  KEY `pay_id` (`pay_id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pz_order_info
-- ----------------------------
INSERT INTO `pz_order_info` VALUES ('40', '1476014712obr', '3', '0', '0', '0', '乔祝垒', '中国', '上海市', '上海市', '黄浦区', '', '450000', '15537172119', '', '0', '', '0', '', '', '', '', '1000.00', '0.00', '0.00', '0.00', '0.00', '0.00', '0', '0.00', '0.00', '1476014712', '0', '0', '0', '', '', '', '0.00', '0', '0.00');

-- ----------------------------
-- Table structure for pz_pinpai
-- ----------------------------
DROP TABLE IF EXISTS `pz_pinpai`;
CREATE TABLE `pz_pinpai` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) CHARACTER SET utf8 DEFAULT '' COMMENT '品牌名称',
  `link` varchar(200) CHARACTER SET utf8 DEFAULT '' COMMENT '连接地址',
  `brief` varchar(1000) CHARACTER SET utf8 DEFAULT '' COMMENT '描述',
  `weight` int(11) DEFAULT '0' COMMENT '权重',
  `logo` varchar(255) CHARACTER SET latin1 DEFAULT '' COMMENT 'logo',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- ----------------------------
-- Records of pz_pinpai
-- ----------------------------
INSERT INTO `pz_pinpai` VALUES ('11', '樊文花', 'http://www.baidu.com', '樊文花  樊文花', '0', '2016/06/15/wky3x0i3ttwq7awldxhzt65wbot_r68i.jpg');

-- ----------------------------
-- Table structure for pz_role
-- ----------------------------
DROP TABLE IF EXISTS `pz_role`;
CREATE TABLE `pz_role` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `groupid` int(11) DEFAULT '0' COMMENT '用户组id',
  `name` varchar(255) DEFAULT '' COMMENT '角色名称',
  `des` varchar(1000) DEFAULT '' COMMENT '角色描述',
  `state` int(255) DEFAULT '0' COMMENT '角色状态',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pz_role
-- ----------------------------
INSERT INTO `pz_role` VALUES ('3', '3', '主编', '', '0');
INSERT INTO `pz_role` VALUES ('4', '3', '编辑', '', '0');

-- ----------------------------
-- Table structure for pz_user
-- ----------------------------
DROP TABLE IF EXISTS `pz_user`;
CREATE TABLE `pz_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `mail` varchar(60) NOT NULL DEFAULT '',
  `username` varchar(60) NOT NULL DEFAULT '',
  `password` varchar(32) NOT NULL DEFAULT '',
  `question` varchar(255) NOT NULL DEFAULT '',
  `answer` varchar(255) NOT NULL DEFAULT '',
  `money` decimal(10,2) NOT NULL DEFAULT '0.00',
  `rank_points` int(10) unsigned NOT NULL DEFAULT '0',
  `reg_time` int(10) unsigned NOT NULL DEFAULT '0',
  `last_login` int(11) unsigned NOT NULL DEFAULT '0',
  `last_ip` varchar(15) NOT NULL DEFAULT '',
  `user_rank` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `salt` varchar(10) NOT NULL DEFAULT '0',
  `qq` varchar(20) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `state` tinyint(3) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  UNIQUE KEY `user_name` (`username`),
  KEY `email` (`mail`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pz_user
-- ----------------------------
INSERT INTO `pz_user` VALUES ('3', 'huabinglan@163.c1om', 'ceshi', 'fdfc20c11ac0f3444d8a43c13c334c46', '', '', '0.00', '0', '1475722626', '1475722626', '192.168.1.3', '0', 'aiMxZOJy:.', '', '15537172119', '1');
INSERT INTO `pz_user` VALUES ('2', 'asd@163.com', 'asdasd', '124beac53529754a1abe828a761c29a6', '', '', '0.00', '0', '1475681818', '1475681818', '192.168.1.3', '0', 'gT[<y6XAHM', '', '15537172119', '1');
INSERT INTO `pz_user` VALUES ('4', 'huabinglan@163.com', 'huabinglan', 'bbbcacc04e1996b685f30c8fd269a8b6', '', '', '0.00', '0', '1475896606', '1475896606', '192.168.1.43', '0', '8Njf9k}Liq', '', '15537172119', '1');

-- ----------------------------
-- Table structure for pz_user_address
-- ----------------------------
DROP TABLE IF EXISTS `pz_user_address`;
CREATE TABLE `pz_user_address` (
  `address_id` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `consignee` varchar(60) NOT NULL DEFAULT '' COMMENT '收货人',
  `email` varchar(60) NOT NULL DEFAULT '',
  `country` varchar(200) NOT NULL DEFAULT '0',
  `province` varchar(200) NOT NULL DEFAULT '0',
  `city` varchar(200) NOT NULL DEFAULT '0',
  `district` varchar(200) NOT NULL DEFAULT '0',
  `address` varchar(120) NOT NULL DEFAULT '',
  `zipcode` varchar(60) NOT NULL DEFAULT '',
  `tel` varchar(60) NOT NULL DEFAULT '',
  `state` tinyint(3) DEFAULT '0' COMMENT '状态，1为默认收货地址',
  PRIMARY KEY (`address_id`),
  KEY `user_id` (`user_id`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pz_user_address
-- ----------------------------
INSERT INTO `pz_user_address` VALUES ('2', '3', '乔祝垒', '', '0', '上海市', '上海市', '黄浦区', '', '450000', '15537172119', '0');
INSERT INTO `pz_user_address` VALUES ('3', '3', '乔祝垒', '', '0', '河北省', '石家庄市', '长安区', '阿达岁的1', '450000', '15537172119', '0');
INSERT INTO `pz_user_address` VALUES ('4', '3', '乔祝垒', '', '0', '河南省', '郑州市', '金水区', '商城路未来路中原国际6号楼1单元12楼西户', '450000', '15537172119', '0');

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
INSERT INTO `pz_user_admin` VALUES ('1', 'root', '左盐', 'ca961093927fe366611a46e370d89e4f', '0', 'x#WSWi%oGM', '0', '0');

-- ----------------------------
-- Table structure for pz_usergroup
-- ----------------------------
DROP TABLE IF EXISTS `pz_usergroup`;
CREATE TABLE `pz_usergroup` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT '' COMMENT '用户组名称',
  `des` varchar(1000) DEFAULT '' COMMENT '用户组描述',
  `state` int(4) DEFAULT '0' COMMENT '用户组状态',
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of pz_usergroup
-- ----------------------------
INSERT INTO `pz_usergroup` VALUES ('1', '超级管理员', '超级管理员', '0');
INSERT INTO `pz_usergroup` VALUES ('3', '编辑部', '编辑部', '0');
