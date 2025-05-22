import { useState, useEffect, useRef } from 'react';

function Terminal() {
    const [input, setInput] = useState('');
    const [history, setHistory] = useState<string[]>([]);
    const [output, setOutput] = useState<string[]>([]);
    const [showCursor, setShowCursor] = useState(true);
    const [, setCommandIndex] = useState<number | null>(null);
    const terminalRef = useRef<HTMLDivElement>(null);

    // 闪烁光标
    useEffect(() => {
        const interval = setInterval(() => {
            setShowCursor(prev => !prev);
        }, 500);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        terminalRef.current?.focus();
    }, []);

    // 初始信息
    useEffect(() => {
        setOutput(['Ciallo～(∠·ω< )⌒☆']);
        console.log(` ________  ___  ________  ___       ___       ________        
|\\   ____\\|\\  \\|\\   __  \\|\\  \\     |\\  \\     |\\   __  \\       
\\ \\  \\___|\\ \\  \\ \\  \\|\\  \\ \\  \\    \\ \\  \\    \\ \\  \\|\\  \\      
 \\ \\  \\    \\ \\  \\ \\   __  \\ \\  \\    \\ \\  \\    \\ \\  \\\\\\  \\     
  \\ \\  \\____\\ \\  \\ \\  \\ \\  \\ \\  \\____\\ \\  \\____\\ \\  \\\\\\  \\    
   \\ \\_______\\ \\__\\ \\__\\ \\__\\ \\_______\\ \\_______\\ \\_______\\   
    \\|_______|\\|__|\\|__|\\|__|\\|_______|\\|_______|\\|_______|   `)
    }, []);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key.length === 1 && !e.ctrlKey && !e.altKey && !e.metaKey) {
            setInput(prev => prev + e.key);
        } else if (e.key === 'Backspace') {
            setInput(prev => prev.slice(0, -1));
        } else if (e.key === 'Enter') {
            processCommand(input.trim());
            setHistory(prev => [...prev, input.trim()]);
            setInput('');
            setCommandIndex(null);
        } else if (e.key === 'ArrowUp') {
            if (history.length > 0) {
                setCommandIndex(prev => {
                    const newIndex = prev === null ? history.length - 1 : Math.max(0, prev - 1);
                    setInput(history[newIndex]);
                    return newIndex;
                });
            }
        } else if (e.key === 'ArrowDown') {
            if (history.length > 0) {
                setCommandIndex(prev => {
                    if (prev === null) return null;
                    const newIndex = Math.min(history.length - 1, prev + 1);
                    setInput(history[newIndex] || '');
                    return newIndex;
                });
            }
        }
    };

    const processCommand = (command: string) => {
        if (!command) return;
        let response = '';
        if (command === 'help') {
            response = 'help, about, time, clear';
        } else if (command === 'about') {
            response = 'Ciallo～(∠·ω< )⌒☆';
        } else if (command === 'time') {
            response = new Date().toLocaleString();
        } else if (command === 'clear') {
            setOutput([]);
            return;
        } else {
            response = `command not found: ${command}`;
        }
        setOutput(prev => [...prev, `> ${command}`, response]);
    };

    return (
        <div
            className="terminal"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            ref={terminalRef}
            style={{
                outline: 'none',
                fontFamily: 'monospace',
                background: '#111',
                color: '#0f0',
                padding: '8px',
                borderRadius: '6px',
                display: 'inline-block',
                minWidth: '85vh',
                overflowY: 'auto',
            }}
        >
            {output.map((line, idx) => (
                <div key={idx}>
                    {line}
                </div>
            ))}
            <div>
                <span>&gt; </span>{input}
                {showCursor && <span className="cursor">|</span>}
            </div>
        </div>
    );
}

export default Terminal;
