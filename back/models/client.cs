using back.models;

namespace back.models
{
    public class client : user
    {
        public string token { get; set; }
        public string tokenRefresh { get; set; }
        public string role { get; set; }
    }
}
