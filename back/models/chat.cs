

using System;
namespace back.models
{
    public class chat : disscution
    {
        public Guid chatId { get; set; }
        public Guid clientId { get; set; }
    }
}