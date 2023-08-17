package com.whoiszxl.zhipin.tools.gpt.session.impl;

import com.whoiszxl.zhipin.tools.gpt.IGptApi;
import com.whoiszxl.zhipin.tools.gpt.cqrs.request.ChatCommand;
import com.whoiszxl.zhipin.tools.gpt.cqrs.request.CompletionsCommand;
import com.whoiszxl.zhipin.tools.gpt.cqrs.response.ChatResponse;
import com.whoiszxl.zhipin.tools.gpt.cqrs.response.CompletionsResponse;
import com.whoiszxl.zhipin.tools.gpt.session.GptSession;

/**
 * gpt session openAi实现
 * @author whoiszxl
 */
public class OpenAiGptSession implements GptSession {

    private final IGptApi gptApi;

    public OpenAiGptSession(IGptApi gptApi) {
        this.gptApi = gptApi;
    }

    @Override
    public CompletionsResponse completions(CompletionsCommand completionsCommand) {
        return gptApi.completions(completionsCommand).blockingGet();
    }

    @Override
    public CompletionsResponse completions(String prompt) {
        CompletionsCommand command = CompletionsCommand.builder()
                .prompt(prompt)
                .build();
        return gptApi.completions(command).blockingGet();
    }

    @Override
    public ChatResponse chat(ChatCommand chatCommand) {
        return this.gptApi.chat(chatCommand).blockingGet();
    }
}
