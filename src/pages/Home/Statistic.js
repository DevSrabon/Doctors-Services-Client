import { useEffect, useState } from "react";
import CountUp from "react-countup";
export const Statistic = () => {
    const [data, setData] = useState({})
    
    useEffect(() => {
        fetch("https://doc-service-server.vercel.app/totalDoc").then((res) =>
					res.json().then((data) => setData(data))
				);
    }, [])
    
	return (
		<div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20 bg-gray-100">
			<div className="grid grid-cols-1 row-gap-8 md:grid-cols-3">
				<div className="text-center md:border-r">
					<h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">
						<CountUp end={data && data?.user} start={0} delay={2} />
					</h6>
					<p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
						Users
					</p>
				</div>
				<div className="text-center md:border-r">
					<h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">
						<CountUp end={data && data?.review} start={0} delay={2} />
					</h6>
					<p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
						Reviews
					</p>
				</div>
				<div className="text-center">
					<h6 className="text-4xl font-bold lg:text-5xl xl:text-6xl">
						<CountUp end={data && data?.service} start={0} delay={2} />
					</h6>
					<p className="text-sm font-medium tracking-widest text-gray-800 uppercase lg:text-base">
						Doctors
					</p>
				</div>
			</div>
		</div>
	);
};
