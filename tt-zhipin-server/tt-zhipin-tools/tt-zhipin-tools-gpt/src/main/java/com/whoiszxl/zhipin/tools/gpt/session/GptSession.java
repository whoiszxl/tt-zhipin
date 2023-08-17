package com.whoiszxl.zhipin.tools.gpt.session;

import com.whoiszxl.zhipin.tools.gpt.cqrs.request.ChatCommand;
import com.whoiszxl.zhipin.tools.gpt.cqrs.request.CompletionsCommand;
import com.whoiszxl.zhipin.tools.gpt.cqrs.response.ChatResponse;
import com.whoiszxl.zhipin.tools.gpt.cqrs.response.CompletionsResponse;

/**
 * gpt session 接口
 * @author whoiszxl
 */
public interface GptSession {

    CompletionsResponse completions(CompletionsCommand completionsCommand);

    CompletionsResponse completions(String prompt);

    ChatResponse chat(ChatCommand chatCommand);

}
