using System.IO;
using System;
using Microsoft.AspNetCore.Http;

namespace back.DTO
{
    public class charactersDTO
    {

        public Guid id { get; set; }
        public string typeContent { get; set; }
        public Guid ownerClientId { get; set; }
        public Guid lastEditor { get; set; }
        public string description { get; set; }
        public IFormFile img { get; set; }
    }
}