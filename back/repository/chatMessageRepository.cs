using System;
using back.interfaces;
using back.models;
using System.Collections.Generic;
using back.db;
using System.Linq;
using back.DTO;

namespace back.repository
{
    public class chatMessageRepository
    {
        dbContextFWebsite db;
        public chatMessageRepository()
        {
            db = new dbContextFWebsite();
        }

        public void create(chatMessagesDTO item)
        {
            db.ChatMessages.Add(returnEntity(item));
            db.SaveChanges();
        }

        public List<chatMessagesDTO> getAll()
        {
            var list = db.ChatMessages.ToList();
            List<chatMessagesDTO> result = new List<chatMessagesDTO>();
            foreach (var item in list)
            {
                result.Add(new chatMessagesDTO()
                {
                    id = item.id,
                    chatId = item.chatId,
                    messageId = item.messageId,
                });
            }
            return result;
        }

        public List<chatMessagesDTO> getMessagesId(Guid chatId)
        {
            return getAll().Where(_item => _item.chatId == chatId).ToList();
        }

        public chatMessages returnEntity(chatMessagesDTO item)
        {
            return new chatMessages()
            {
                id = item.id,
                chatId = item.chatId,
                messageId = item.messageId,
            };
        }
        public chatMessagesDTO returnDTO(chatMessages item)
        {
            return new chatMessagesDTO()
            {
                id = item.id,
                chatId = item.chatId,
                messageId = item.messageId,
            };
        }
    }
}