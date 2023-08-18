package com.whoiszxl.zhipin.im.bean;

import lombok.Builder;
import lombok.Data;

/**
 * channel attr dto
 * @author whoiszxl
 */
@Data
@Builder
public class ChannelAttrDto {
    private String memberId;
    private byte clientType;
    private String imei;
}
