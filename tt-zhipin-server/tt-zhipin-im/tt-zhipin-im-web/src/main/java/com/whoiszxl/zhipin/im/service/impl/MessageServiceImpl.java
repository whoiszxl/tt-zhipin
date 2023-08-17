package com.whoiszxl.zhipin.im.service.impl;

import com.whoiszxl.zhipin.im.entity.Message;
import com.whoiszxl.zhipin.im.mapper.MessageMapper;
import com.whoiszxl.zhipin.im.service.IMessageService;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import org.springframework.stereotype.Service;

/**
 * <p>
 * 消息表 服务实现类
 * </p>
 *
 * @author whoiszxl
 * @since 2023-08-17
 */
@Service
public class MessageServiceImpl extends ServiceImpl<MessageMapper, Message> implements IMessageService {

}
