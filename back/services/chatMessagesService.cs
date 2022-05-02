using System.Collections.Generic;
using System;
using back.repository;
using back.DTO;

namespace back.services
{
    public class chatMessagesService
    {
        chatMessageRepository repository;
        public chatMessagesService()
        {
            repository = new chatMessageRepository();
        }

        public void create(chatMessagesDTO item)
        {
            repository.create(item);
        }

        public List<chatMessagesDTO> getMessagesId(Guid chatId)
        {
            return repository.getMessagesId(chatId);
        }
    }
}